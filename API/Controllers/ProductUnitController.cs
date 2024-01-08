

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
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
}