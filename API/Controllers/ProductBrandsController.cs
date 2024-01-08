

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductBrandsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    public ProductBrandsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
        var productBrands = await _unitOfWork.Repository<ProductBrand>().GetAllAsync();

        if(productBrands == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productBrands);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductBrand>> GetProductBrand(int id)
    {
        var productBrand = await _unitOfWork.Repository<ProductBrand>().GetByIdAsync(id);

        if(productBrand == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productBrand);
    }

    [HttpPost("Create")]
    public async Task<ActionResult> CreateProductBrandAsync(ProductBrand productBrand)
    {
        try
        {
            if(productBrand is not null)
            {
                await _unitOfWork.Repository<ProductBrand>().AddAsync(productBrand);
                await _unitOfWork.Complete();
            }
            return Ok(productBrand);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}