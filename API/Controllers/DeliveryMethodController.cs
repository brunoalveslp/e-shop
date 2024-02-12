using API.Errors;
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DeliveryMethodController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public DeliveryMethodController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<List<DeliveryMethod>>> GetDeliveryMethods()
    {
        var deliveryMethods = await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();

        if (deliveryMethods == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(deliveryMethods);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DeliveryMethod>> GetDeliveryMethodsById(int id)
    {
        var deliveryMethods = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);

        if (deliveryMethods == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(deliveryMethods);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("Create")]
    public async Task<ActionResult> CreateDeliveryMethodsAsync(DeliveryMethod deliveryMethod)
    {
        try
        {
            if (deliveryMethod is not null)
            {
                await _unitOfWork.Repository<DeliveryMethod>().AddAsync(deliveryMethod);
                await _unitOfWork.Complete();
            }
            return Ok(deliveryMethod);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateDeliveryMethodAsync(DeliveryMethod deliveryMethod)
    {
        try
        {
            if (deliveryMethod is not null)
            {
                _unitOfWork.Repository<DeliveryMethod>().Update(deliveryMethod);
                await _unitOfWork.Complete();
            }
            return Ok(deliveryMethod);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteDeliveryMethodAsync(int id)
    {
        try
        {
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);

            if (deliveryMethod is not null)
            {
                _unitOfWork.Repository<DeliveryMethod>().Delete(deliveryMethod);
                await _unitOfWork.Complete();
            }
            return Ok(deliveryMethod);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
