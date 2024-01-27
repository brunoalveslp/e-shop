

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize(Roles = "Admin")]
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

    [Authorize(Roles = "Admin")]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateProductBrandAsync(ProductBrand productBrand)
    {
        try
        {
            if (productBrand is not null)
            {
                _unitOfWork.Repository<ProductBrand>().Update(productBrand);
                await _unitOfWork.Complete();
            }
            return Ok(productBrand);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteProductBrandAsync(int id)
    {
        try
        {
            var productBrand = await _unitOfWork.Repository<ProductBrand>().GetByIdAsync(id);

            if (productBrand is not null)
            {
                _unitOfWork.Repository<ProductBrand>().Delete(productBrand);
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