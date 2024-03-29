﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UserDto
{
    [Required]
    public string Email { get; set; }
    [Required]
    public List<string> Roles { get; set; }
    [Required]
    public string DisplayName { get; set; }
    [Required]
    public string Token { get; set; }
}