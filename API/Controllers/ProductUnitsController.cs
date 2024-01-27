

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class ProductUnitsController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductUnitsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductUnit>>> GetProductUnits()
    {
        var productUnits = await _unitOfWork.Repository<ProductUnit>().GetAllAsync();

        if (productUnits == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productUnits);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductUnit>> GetproductUnitById(int id)
    {
        var productUnit = await _unitOfWork.Repository<ProductUnit>().GetByIdAsync(id);

        if (productUnit == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(productUnit);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("Create")]
    public async Task<ActionResult> CreateProductUnitAsync(ProductUnit productUnit)
    {
        try
        {
            if (productUnit is not null)
            {
                await _unitOfWork.Repository<ProductUnit>().AddAsync(productUnit);
                await _unitOfWork.Complete();
            }
            return Ok(productUnit);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateProductUnitAsync(ProductUnit productUnit)
    {
        try
        {
            if (productUnit is not null)
            {
                _unitOfWork.Repository<ProductUnit>().Update(productUnit);
                await _unitOfWork.Complete();
            }
            return Ok(productUnit);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteProductUnitAsync(int id)
    {
        try
        {
            var productUnit = await _unitOfWork.Repository<ProductUnit>().GetByIdAsync(id);

            if (productUnit is not null)
            {
                _unitOfWork.Repository<ProductUnit>().Delete(productUnit);
                await _unitOfWork.Complete();
            }
            return Ok(productUnit);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}