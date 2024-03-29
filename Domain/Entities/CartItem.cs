﻿namespace Domain.Entities;

public class CartItem
{
    public int Id { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
    public Size Size { get; set; }
    public int Quantity { get; set; }
    public decimal Weight { get; set; }
    public string PictureUrl { get; set; }
    public string Brand { get; set;}
    public string Type { get; set; }
    public string Unit { get; set; }
}