using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class StockController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        private readonly IStockMovimentService _movimentService;
        private readonly IMapper _mapper;

        public StockController(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper, IStockMovimentService movimentService)
        {

            _fileService = fileService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _movimentService = movimentService;
        }

        [HttpGet("products")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProductsAsync([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandAndUnitSpecification(productParams);
            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);
            var totalItems = await _unitOfWork.Repository<Product>().CountAsync(countSpec);
            var products = await _unitOfWork.Repository<Product>().ListAsync(spec);


            if (products == null)
            {
                return NotFound(new ApiResponse(404, "Não há produtos."));
            }

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("products/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProductByIdAsync(int id)
        {
            var spec = new ProductsWithTypesAndBrandAndUnitSpecification(id);
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpecification(spec);

            if (product is null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }


        // MultipartBodyLengthLimit  was needed for zip files with form data.
        // [DisableRequestSizeLimit] works for the KESTREL server, but not IIS server 
        // for IIS: webconfig... <requestLimits maxAllowedContentLength="102428800" />
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")] // for Zip files with form data
        [HttpPost("create-product")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> CreateProductAsync([FromForm] ProductReceivedDto productReceived)
        {
            List<string> aditionalPicturesUrls = new();
            try
            {
                if (productReceived is null)
                {
                    return BadRequest(new ApiResponse(400));
                }

                if (productReceived.picture is not null)
                {
                    var fileResult = _fileService.SaveImage(productReceived.picture);
                    if (fileResult.Item1)
                    {
                        productReceived.PictureUrl = fileResult.Item2;
                    }
                }

                if (productReceived.aditionalPictures is not null)
                {
                    foreach (var aditionalPicture in productReceived.aditionalPictures)
                    {
                        var fileResult = _fileService.SaveImage(aditionalPicture);
                        if (fileResult.Item1)
                        {
                            aditionalPicturesUrls.Add(fileResult.Item2);
                        }
                    }
                }

                productReceived.AditionalPicturesUrls = aditionalPicturesUrls;
                var pb = await _unitOfWork.Repository<ProductBrand>().GetProductBrandByNameAsync(productReceived.ProductBrandName);
                var pu = await _unitOfWork.Repository<ProductUnit>().GetProductUnitByNameAsync(productReceived.ProductUnitName);
                var pt = await _unitOfWork.Repository<ProductType>().GetProductTypeByNameAsync(productReceived.ProductTypeName);

                var product = new Product {
                    Name = productReceived.Name,
                    Description = productReceived.Description,
                    Price = productReceived.Price,
                    PictureUrl = productReceived.PictureUrl,
                    AditionalPicturesUrls = productReceived.AditionalPicturesUrls,
                    Weight = productReceived.Weight,
                    ProductBrandId = pb.Id,
                    ProductUnitId = pu.Id,
                    ProductTypeId = pt.Id,
                };
                
                Console.WriteLine(product);

                try
                {
                    
                    await _unitOfWork.Repository<Product>().AddAsync(product);
                    await _unitOfWork.Complete();
                    var prodSizeList = JsonConvert.DeserializeObject<List<ProductSize>>(productReceived.ProductSizes);

                    foreach (var prodSize in prodSizeList)
                    {
                        var productSize = new ProductSize
                        {
                            ProductId = product.Id, 
                            SizeId = prodSize.SizeId,
                            Quantity = prodSize.Quantity,
                            IsActive = prodSize.IsActive
                        };

                        await _unitOfWork.Repository<ProductSize>().AddAsync(productSize);
                    }

                    await _unitOfWork.Complete();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    _fileService.DeleteImage(productReceived.PictureUrl);
                    foreach (var image in productReceived.AditionalPicturesUrls)
                    {
                        _fileService.DeleteImage(image);
                    }
                    return BadRequest(new ApiException(400, ex.Message));
                }
            
                return Ok(product);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(new ApiException(400, ex.Message));
            }
        }

        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")] // for Zip files with form data
        [HttpPut("update-product")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> UpdateProductAsync([FromForm] ProductReceivedDto productReceived)
        {
            var actualProduct = await _unitOfWork.Repository<Product>().GetByIdAsync(productReceived.Id);
            List<string> aditionalPicturesUrls = new();
            try
            {
                if (productReceived is null)
                {
                    return BadRequest(new ApiResponse(400));
                }

                if (productReceived.picture is not null)
                {
                    var fileName = Path.GetFileName(productReceived.picture.FileName);
                    if (!actualProduct.PictureUrl.Equals(fileName))
                    {
                        if (!string.IsNullOrEmpty(actualProduct.PictureUrl))
                        {
                            _fileService.DeleteImage(actualProduct.PictureUrl);
                        }

                        var fileResult = _fileService.SaveImage(productReceived.picture);

                        if (fileResult.Item1)
                        {
                            actualProduct.PictureUrl = fileResult.Item2;
                        }
                    }
                }

                
                var prodSizeList = JsonConvert.DeserializeObject<List<ProductSize>>(productReceived.ProductSizes);
                foreach (var prodSize in prodSizeList)
                {
                    // 1: this line is returning this
                    var productSize = _unitOfWork.Repository<ProductSize>().GetAllAsync().Result.FirstOrDefault(x => x.ProductId == actualProduct.Id && x.SizeId == prodSize.SizeId);
                    if (productSize == null)
                    {
                        productSize = new ProductSize
                        {
                            ProductId = actualProduct.Id,
                            SizeId = prodSize.SizeId,
                            Quantity = prodSize.Quantity,
                            IsActive = prodSize.IsActive
                        };
                        await StockEntryAsync(actualProduct.Id, prodSize.SizeId,productSize.Quantity);
                        await _unitOfWork.Repository<ProductSize>().AddAsync(productSize);
                    }
                    else
                    {
                        if (productSize.Quantity != prodSize.Quantity)
                        {
                            if (productSize.Quantity < prodSize.Quantity)
                            {
                                await StockEntryAsync(actualProduct.Id, prodSize.SizeId, prodSize.Quantity - productSize.Quantity);
                            }
                            else
                            {
                                await _movimentService.OutgoingStockMovimentService(actualProduct, productSize.Size, productSize.Quantity - prodSize.Quantity);
                            }
                        }
                        productSize.Quantity = prodSize.Quantity;
                        productSize.IsActive = prodSize.IsActive;

                        await _unitOfWork.Repository<ProductSize>().UpdateAsync(productSize);
                    }
                
                }


                if (productReceived.aditionalPictures is not null)
                {
                    var actualAditionalPictures = new List<string>(actualProduct.AditionalPicturesUrls);
                    foreach (var aditionalPicture in productReceived.aditionalPictures)
                    {
                        var fileName = Path.GetFileName(aditionalPicture.FileName);
                        if (!actualAditionalPictures.Contains(fileName))
                        {
                            var fileResult = _fileService.SaveImage(aditionalPicture);
                            if (fileResult.Item1)
                            {
                                aditionalPicturesUrls.Add(fileResult.Item2);
                            }
                        }
                        else
                        {
                            aditionalPicturesUrls.Add(fileName);
                        }
                    }

                    foreach (var remainingPicture in actualAditionalPictures)
                    {
                        if (!aditionalPicturesUrls.Contains(remainingPicture))
                        {
                            _fileService.DeleteImage(remainingPicture);
                        }
                    }
                }
                else
                {
                    aditionalPicturesUrls = actualProduct.AditionalPicturesUrls;
                }

                actualProduct.AditionalPicturesUrls = aditionalPicturesUrls;

                // Update other fields
                actualProduct.ProductType = await _unitOfWork.Repository<ProductType>().GetProductTypeByNameAsync(productReceived.ProductTypeName);
                actualProduct.ProductBrand = await _unitOfWork.Repository<ProductBrand>().GetProductBrandByNameAsync(productReceived.ProductBrandName);
                actualProduct.ProductUnit = await _unitOfWork.Repository<ProductUnit>().GetProductUnitByNameAsync(productReceived.ProductUnitName);
                try
                {
                    await _unitOfWork.Repository<Product>().UpdateAsync(actualProduct);
                    await _unitOfWork.Complete();

                    return Ok(actualProduct);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return BadRequest(new ApiException(400, ex.Message));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return BadRequest(new ApiException(400, ex.Message));
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product is not null)
            {
                if (product.AditionalPicturesUrls is not null)
                {
                    try
                    {
                        _fileService.DeleteImage(product.PictureUrl);

                        foreach (var image in product.AditionalPicturesUrls)
                        {
                            _fileService.DeleteImage(image);
                        }

                        
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new ApiException(400, ex.Message));
                    }
                }
            }

            _unitOfWork.Repository<Product>().Delete(product);
            await _unitOfWork.Complete();

            return Ok("Product " + product.Name + " Deleted Successfully!");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("stock-entry")]
        public async Task<ActionResult> StockEntryAsync(int id, int sizeId, decimal quantity)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            var size = await _unitOfWork.Repository<Size>().GetByIdAsync(sizeId);
            if (product != null && size != null)
            {
                if (quantity > 0)
                {
                    try
                    {
                        await _movimentService.EntryStockMovimentService(product, size, quantity);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }

            return Ok(product);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("stock-outgoing")]
        public async Task<ActionResult> StockOutgoingAsync(int id, int sizeId, decimal quantity)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            var size = await _unitOfWork.Repository<Size>().GetByIdAsync(sizeId);
            if (product != null && size != null)
            {
                if (quantity > 0)
                {
                    try
                    {
                        await _movimentService.OutgoingStockMovimentService(product, size, quantity);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }

            return Ok(product);
        }


        [HttpGet("stock-moviments")]
        public async Task<ActionResult> GetStockMovimentationAsync()
        {
            var moviments = await _unitOfWork.Repository<ProductMovimentHistory>().GetAllAsync();
            if (moviments is not null)
            {
                return Ok(moviments);
            }

            return BadRequest(new ApiException(400));
        }

        [HttpGet("stock-moviments/{id}")]
        public async Task<ActionResult> GetStockMovimentationByProductAsync(int id)
        {
            var spec = new ProductMovimentSpecification(id);
            var moviments = await _unitOfWork.Repository<ProductMovimentHistory>().ListAsync(spec);
            if (moviments is not null)
            {
                return Ok(moviments);
            }

            return BadRequest(new ApiException(400));
        }

        [HttpPost("add-product-image")]
        public async Task<ActionResult> AddProductImage(int productId, IFormFile image)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productId);

            if (product is not null)
            {
                var fileResult = _fileService.SaveImage(image);
                product.PictureUrl = fileResult.Item2; ;

                await _unitOfWork.Repository<Product>().UpdateAsync(product);
                await _unitOfWork.Complete();
            }
            return Ok(new ApiResponse(200));

        }

        [HttpPost("add-aditional-product-image")]
        public async Task<ActionResult> AddAditionalProductImage(int productId, IFormFile image)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productId);

            if (product is not null)
            {
                var fileResult = _fileService.SaveImage(image);
                product.AditionalPicturesUrls.Add(fileResult.Item2);

                await _unitOfWork.Repository<Product>().UpdateAsync(product);
                await _unitOfWork.Complete();
            }
            return Ok(new ApiResponse(200));

        }

        [HttpDelete("delete-product-image")]
        public async Task<ActionResult> DeleteProductImage(int productId, string imageName)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productId);

            if (product is not null)
            {
                var fileResult = _fileService.DeleteImage(imageName);
                if (fileResult)
                {
                    product.PictureUrl = "";
                    await _unitOfWork.Repository<Product>().UpdateAsync(product);
                    await _unitOfWork.Complete();
                }
            }

            return Ok(new ApiResponse(200));

        }

        [HttpDelete("delete-aditional-product-image")]
        public async Task<ActionResult> DeleteAditionalProductImage(int productId, string imageName)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productId);

            if (product is not null)
            {
                var fileResult = _fileService.DeleteImage(imageName);
                if (fileResult)
                {
                    product.AditionalPicturesUrls.Remove(imageName);
                    await _unitOfWork.Repository<Product>().UpdateAsync(product);
                    await _unitOfWork.Complete();
                }
            }

            return Ok(new ApiResponse(200));

        }
    }
}
