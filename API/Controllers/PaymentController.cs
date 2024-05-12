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
    private const string WebhookSecret = "whsec_733c88e502c45981dd8a7a7880680e7f46cb6aa9481671634592ffc4481b737f";
    private readonly IPaymentService _paymentService;

    public PaymentController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
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

        var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WebhookSecret);

        PaymentIntent intent;

        Order order;

        switch (stripeEvent.Type)
        {
            case "payment_intent.succeeded":
                intent = (PaymentIntent)stripeEvent.Data.Object;
                await _paymentService.UpdateOrderForSucceededPayment(intent.Id);
                //_logger.LogInformation($"Pagamento realizado com sucesso e status atualizado para pagamento recebido no pedido: {order.Id}");
                break;
            case "payment_intent.payment_failed":
                intent = (PaymentIntent)stripeEvent.Data.Object;
                await _paymentService.UpdateOrderForSucceededPayment(intent.Id);
                //_logger.LogInformation($"Pagamento com problemas e status atualizado para falha no pagamento no pedido: {order.Id}");
                break;
        }

        return new EmptyResult();
    }
}
