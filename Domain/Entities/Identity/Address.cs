using System.ComponentModel.DataAnnotations;

namespace Domain.Entities.Identity;

public class Address
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }

    [Required]
    public string UserId { get; set; }
    public AppUser User { get; set; }

}
