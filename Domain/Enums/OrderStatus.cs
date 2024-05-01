using System.Runtime.Serialization;

namespace Domain.Enums;

public enum OrderStatus
{
    [EnumMember(Value = "Pendente")]
    Pending,
    [EnumMember(Value = "Pagamento Recebido")]
    PaymentReceived,
    [EnumMember(Value = "Falha no Pagamento")]
    PaymentFailed,
    [EnumMember(Value = "Canceled")]
    Canceled,
}
