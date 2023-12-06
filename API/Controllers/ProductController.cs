using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        [NonAction]
        public IActionResult GetProducts()
        {
            return Ok();
        }
    }
}
