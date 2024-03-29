﻿using System.Runtime.Serialization;

namespace Domain.Enums;

public enum OrderStatus
{
    [EnumMember(Value = "Pending")]
    Pending,
    [EnumMember(Value = "Payment Received")]
    PaymentReceived,
    [EnumMember(Value = "Payment Failed")]
    PaymentFailed,
    [EnumMember(Value = "Canceled")]
    Canceled,
}
