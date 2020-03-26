using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swiftcards.API.Models.Users;
using Swiftcards.Data.Services;
using System.Threading.Tasks;

namespace Swiftcards.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private IMapper mapper;
        private IUserService userService;

        public ProfileController(IMapper mapper, IUserService userService)
        {
            this.mapper = mapper;
            this.userService = userService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var user = await userService.Get(HttpContext.User.Identity.Name);

            if (user == null)
                return BadRequest();

            user.Cards.Reverse();

            return Ok(mapper.Map<UserModel>(user));
        }

    }
}
