using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SizesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public SizesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<List<Size>>> GetSizes()
    {
        var sizes = await _unitOfWork.Repository<Size>().GetAllAsync();

        if (sizes == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(sizes);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Size>> GetSizeById(int id)
    {
        var size = await _unitOfWork.Repository<Size>().GetByIdAsync(id);

        if (size == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(size);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("Create")]
    public async Task<ActionResult> CreateSizeAsync(Size size)
    {
        try
        {
            if (size is not null)
            {
                await _unitOfWork.Repository<Size>().AddAsync(size);
                await _unitOfWork.Complete();
            }
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("update")]
    public async Task<ActionResult> UpdateProductTypeAsync(Size size)
    {
        try
        {
            if (size is not null)
            {
                await _unitOfWork.Repository<Size>().UpdateAsync(size);
                await _unitOfWork.Complete();
            }
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteSizeAsync(int id)
    {
        try
        {
            var size = await _unitOfWork.Repository<Size>().GetByIdAsync(id);

            if (size is not null)
            {
                _unitOfWork.Repository<Size>().Delete(size);
                await _unitOfWork.Complete();
            }
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
