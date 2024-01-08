

using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
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
}