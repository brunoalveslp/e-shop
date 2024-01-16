using Domain.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services;

public class FileService : IFileService
{

    private readonly IWebHostEnvironment _environment;

    public FileService(IWebHostEnvironment env)
    {
        _environment = env;
    }

    public Tuple<bool, string> SaveImage(IFormFile imageFile)
    {
        if (imageFile is null) { return new Tuple<bool, string>(false, "Error has occured"); }

        try
        {
            var contentPath = _environment.WebRootPath;

            // path = "c://projects/productminiapi/uploads" ,not exactly something like that
            var path = Path.Combine(contentPath, "images");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            // Check the allowed extenstions
            var ext = Path.GetExtension(imageFile.FileName);

            var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg" };


            if (!allowedExtensions.Contains(ext))
            {
                string msg = string.Format("Only {0} extensions are allowed", string.Join(",", allowedExtensions));
                return new Tuple<bool, string>(false, msg);
            }

            string uniqueName = Guid.NewGuid().ToString();
            // we are trying to create a unique filename here
            var newFileName = uniqueName + ext;
            var fileWithPath = Path.Combine(path, newFileName);

            using (var stream = new FileStream(fileWithPath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            return new Tuple<bool, string>(true, newFileName);
        }
        catch (Exception ex)
        {
            return new Tuple<bool, string>(false, "Error has occured" + "\n" + ex.Message);
        }
    }

    public bool DeleteImage(string imageFileName)
    {
        try
        {
            var wwwPath = _environment.WebRootPath;
            var path = Path.Combine(wwwPath, "images\\", imageFileName);
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }
    }


}