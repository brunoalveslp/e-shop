using API.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace API.Controllers;

public class PaymentController : BaseApiController
{
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<CustomerCart>> CreateOrUpdatePaymentIntent(string cartId)
    {
        return await _paymentService.CreateOrUpdatePaymentIntent(cartId);
    }
}
