namespace Domain.Entities.OrderAggregate;

public class Address : BaseEntity
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }

    public Address()
    {
    }
    
    public Address(string firstName, string lastName, string street, string city, string state, string postalCode)
    {
        FirstName = firstName;
        LastName = lastName;
        Street = street;
        City = city;
        State = state;
        PostalCode = postalCode;
    }
}
