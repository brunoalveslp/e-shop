using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StockController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public StockController(IFileService fileService, IUnitOfWork unitOfWork, IMapper mapper)
        {

            _fileService = fileService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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

        [HttpGet("product/{id}")]
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
        //[Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> CreateProductAsync([FromForm]ProductReceivedDto productReceived, IFormFile[] images)
        {
            List<string> picturesUrls = new();
            try
            {
               if(productReceived is null)
                {
                    return BadRequest(new ApiResponse(400));
                } 
               
               if(images is not null)
                {
                    foreach(var image in images)
                    {
                        var fileResult = _fileService.SaveImage(image);
                        if (fileResult.Item1)
                        {
                            picturesUrls.Add(fileResult.Item2);
                        }
                    }
                }

                productReceived.PicturesUrls = picturesUrls;
                var product = _mapper.Map<Product>(productReceived);

                

                await _unitOfWork.Repository<Product>().AddAsync(product);
                await _unitOfWork.Complete();
                return Ok(product);
            }
            catch (Exception ex)
            {

                return BadRequest(new ApiException(400,ex.Message));
            }
        }

        [HttpPost("delete-product")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product is not null)
            {
                if(product.PicturesUrls is not null)
                {
                    try
                    {
                        foreach(var image in product.PicturesUrls)
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

            await _unitOfWork.Repository<Product>().DeleteAsync(product);
            await _unitOfWork.Complete();

         return Ok("Product "+product.Name+" Deleted Successfully!");
        }

    }
}
