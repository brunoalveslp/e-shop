using Microsoft.AspNetCore.Http;

namespace Domain.Interfaces;

public interface IFileService
{
    public Tuple<bool, string> SaveImage(IFormFile images);
    public bool DeleteImage(string imageFileName);
}
