

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class ProductTypesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductTypesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
        var productTypes = await _unitOfWork.Repository<ProductType>().GetAllAsync();

        if(productTypes == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productTypes);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductType>> GetProductTypeById(int id)
    {
        var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

        if(productType == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productType);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("Create")]
    public async Task<ActionResult> CreateProductTypeAsync(ProductType productType)
    {
        try
        {
            if (productType is not null)
            {
                await _unitOfWork.Repository<ProductType>().AddAsync(productType);
                await _unitOfWork.Complete();
            }
            return Ok(productType);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateProductTypeAsync(ProductType productType)
    {
        try
        {
            if (productType is not null)
            {
                _unitOfWork.Repository<ProductType>().Update(productType);
                await _unitOfWork.Complete();
            }
            return Ok(productType);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteProductTypeAsync(int id)
    {
        try
        {
            var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

            if (productType is not null)
            {
                _unitOfWork.Repository<ProductType>().Delete(productType);
                await _unitOfWork.Complete();
            }
            return Ok(productType);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}