using Domain.Entities.OrderAggregate;

namespace Domain.Specifications;

public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
{
    public OrderByPaymentIntentIdSpecification(string paymentInterntId) : base(O => O.PaymentIntentId == paymentInterntId)
    {
    }
}
