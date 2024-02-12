using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;

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
                return NotFound(new ApiResponse(404));
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
        public async Task<IActionResult> CreateProductAsync(
            [FromForm] ProductReceivedDto productReceived, 
            IFormFile picture ,
            IFormFile[] aditionalPictures)
        {
            List<string> aditionalPicturesUrls = new();
            try
            {
                if (productReceived is null)
                {
                    return BadRequest(new ApiResponse(400));
                }

                if (picture is not null)
                {
                    var fileResult = _fileService.SaveImage(picture);
                    if (fileResult.Item1)
                    {
                        productReceived.PictureUrl = fileResult.Item2;
                    }
                }

                if (aditionalPictures is not null)
                {
                    foreach (var aditionalPicture in aditionalPictures)
                    {
                        var fileResult = _fileService.SaveImage(aditionalPicture);
                        if (fileResult.Item1)
                        {
                            aditionalPicturesUrls.Add(fileResult.Item2);
                        }
                    }
                }

                productReceived.AditionalPicturesUrls = aditionalPicturesUrls;
                var product = _mapper.Map<Product>(productReceived);
                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.Complete();
                return Ok(product);
            }
            catch (Exception ex)
            {

                return BadRequest(new ApiException(400, ex.Message));
            }
        }


        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")] // for Zip files with form data
        [HttpPost("update-product")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> UpdateProductAsync(
            [FromForm] ProductReceivedDto productReceived,IFormFile pictureUrl, 
            IFormFile[] aditionalPictures)
        {
            var actualProduct = await _unitOfWork.Repository<Product>().GetByIdAsync(productReceived.Id);
            List<string> aditionalPicturesUrls = new();
            try
            {
                if (productReceived is null)
                {
                    return BadRequest(new ApiResponse(400));
                }

                if (pictureUrl is not null)
                {
                    if(pictureUrl.FileName != actualProduct.PictureUrl)
                    {
                        _fileService.DeleteImage(actualProduct.PictureUrl);
                        var fileResult = _fileService.SaveImage(pictureUrl);
                        if (fileResult.Item1)
                        {
                            productReceived.PictureUrl = fileResult.Item2;
                        }
                    }
                    productReceived.PictureUrl = actualProduct.PictureUrl;
                }

                if (aditionalPictures is not null)
                {
                    foreach (var aditionalPicture in aditionalPictures)
                    {
                        if (actualProduct.AditionalPicturesUrls.Contains(aditionalPicture.FileName))
                        {
                            aditionalPicturesUrls.Add(aditionalPicture.FileName);
                            continue;
                        }
                        var fileResult = _fileService.SaveImage(aditionalPicture);
                        if (fileResult.Item1)
                        {
                            aditionalPicturesUrls.Add(fileResult.Item2);
                        }
                    }
                }

                productReceived.AditionalPicturesUrls = aditionalPicturesUrls;
                var product = _mapper.Map<Product>(productReceived);

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.Complete();
                return Ok(product);
            }
            catch (Exception ex)
            {

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
                    await _movimentService.OutgoingStockMovimentService(product);
                }
            }

            await _movimentService.OutgoingStockMovimentService(product);
            _unitOfWork.Repository<Product>().Delete(product);
            await _unitOfWork.Complete();

            return Ok("Product " + product.Name + " Deleted Successfully!");
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("stock-entry")]
        public async Task<ActionResult> StockEntryAsync(int id, decimal quantity)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            if(product is not null)
            {
                if(quantity > 0)
                {
                    try
                    {
                        await _movimentService.EntryStockMovimentService(product.Id, quantity);
                    }
                    catch(Exception ex)
                    {
                       return BadRequest(ex.Message);
                    }
                }
            }
            
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("stock-outgoing")]
        public async Task<ActionResult> StockOutgoingAsync(int id, decimal quantity)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            if (product is not null)
            {
                if (quantity > 0)
                {
                    try
                    {
                        await _movimentService.OutgoingStockMovimentService(product.Id, quantity);
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
            if(moviments is not null)
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

                _unitOfWork.Repository<Product>().Update(product);
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

                _unitOfWork.Repository<Product>().Update(product);
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
                    _unitOfWork.Repository<Product>().Update(product);
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
                    _unitOfWork.Repository<Product>().Update(product);
                    await _unitOfWork.Complete();
                }
            }

            return Ok(new ApiResponse(200));

        }
    }
}
