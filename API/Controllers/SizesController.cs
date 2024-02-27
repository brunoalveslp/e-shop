using API.Errors;
using Domain.Entities;
using Domain.Interfaces;
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
        try
        {
            var sizes = await _unitOfWork.Repository<Size>().GetAllAsync();
            return Ok(sizes);
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiException(400, ex.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Size>> GetSize(int id)
    {
        try
        {
            var size = await _unitOfWork.Repository<Size>().GetByIdAsync(id);
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiException(400, ex.Message));
        }
    }

    [HttpPost]
    public async Task<ActionResult> CreateSize(Size size)
    {
        try
        {
            await _unitOfWork.Repository<Size>().AddAsync(size);
            await _unitOfWork.Complete();
            return Ok(size);

        }
        catch (Exception ex)
        {
            return BadRequest(new ApiException(400, ex.Message));
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateSize(int id, Size size)
    {
        try
        {
            await _unitOfWork.Repository<Size>().UpdateAsync(size);
            await _unitOfWork.Complete();
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiException(400, ex.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSize(int id)
    {
        try
        {
            var size = await _unitOfWork.Repository<Size>().GetByIdAsync(id);
            _unitOfWork.Repository<Size>().Delete(size);
            await _unitOfWork.Complete();
            return Ok(size);
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiException(400, ex.Message));
        }
    }
}
