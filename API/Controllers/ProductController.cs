using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        [Authorize(Roles = "User")]
        [HttpGet]
        public string GetProducts()
        {
            return "Its ok";
        }
    }
}
