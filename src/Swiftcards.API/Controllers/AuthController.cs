using Microsoft.AspNetCore.Mvc;
using Swiftcards.API.Models.Auth;
using Swiftcards.Data.Services;
using System.Threading.Tasks;

namespace Swiftcards.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IUserService userService;

        public AuthController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Authenticate(AuthenticateModel model)
        {
            var user = await userService.Authenticate(model.Name, model.Password);

            if (user == null)
                return BadRequest();

            return Ok(new { token = user.Token });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = await userService.Register(model.Name, model.Password);

            if (user == null)
                return BadRequest();

            return Ok(new { token = user.Token });
        }
    }
}
