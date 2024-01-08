﻿namespace API.DTOs;

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public List<string> PicturesUrls { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public decimal Weight { get; set; }
}