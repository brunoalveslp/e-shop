using API.DTOs;
using API.Errors;
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Stripe;

namespace API.Controllers;

public class PaymentController : BaseApiController
{
    private readonly string _webhookSecret;
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService, IConfiguration config)
    {
        _paymentService = paymentService;
        _webhookSecret = config.GetSection("StripeSetting:WebhookSecret").Value;;
    }

    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<CustomerCart>> CreateOrUpdatePaymentIntent(string cartId)
    {
        var cart = await _paymentService.CreateOrUpdatePaymentIntent(cartId);

        if(cart is null)
        {
            return BadRequest(new ApiResponse(400, "Carrinho não encontrado."));
        }

        return cart;
    }

    [HttpPost("stripe")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _webhookSecret);

        PaymentIntent intent;

        switch (stripeEvent.Type)
        {
            case "payment_intent.succeeded":
                intent = (PaymentIntent)stripeEvent.Data.Object;
                await _paymentService.UpdateOrderForSucceededPayment(intent.Id);
                break;
            case "payment_intent.payment_failed":
                intent = (PaymentIntent)stripeEvent.Data.Object;
                await _paymentService.UpdateOrderForSucceededPayment(intent.Id);
                break;
        }

        return new EmptyResult();
    }
}
