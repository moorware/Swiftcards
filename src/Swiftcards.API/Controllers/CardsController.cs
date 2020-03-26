using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swiftcards.API.Models.Cards;
using Swiftcards.Data.Entities;
using Swiftcards.Data.Services;
using System.Threading.Tasks;

namespace Swiftcards.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : ControllerBase
    {
        private IMapper mapper;
        private IUserService userService;
        private ICardService cardService;

        public CardsController(IMapper mapper, IUserService userService, ICardService cardService)
        {
            this.mapper = mapper;
            this.userService = userService;
            this.cardService = cardService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create(CardModel model)
        {
            var user = await userService.Get(HttpContext.User.Identity.Name);

            if (user == null)
                return NotFound();

            var card = mapper.Map<CardEntity>(model);

            card.UserEntity = user;

            if (!await cardService.Create(card))
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpPost("update")]
        public async Task<IActionResult> Update(CardModel model)
        {
            var user = await userService.Get(HttpContext.User.Identity.Name);

            if (user == null)
                return NotFound();

            var card = mapper.Map<CardEntity>(model);

            card.UserEntity = user;

            if (!await cardService.Update(card))
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{link}")]
        public async Task<IActionResult> Delete(string link)
        {
            var user = await userService.Get(HttpContext.User.Identity.Name);

            if (user == null)
                return NotFound();

            if (!await cardService.Delete(link, user))
                return BadRequest();

            return Ok();
        }

        [HttpGet("get/{link}")]
        public async Task<IActionResult> Get(string link)
        {
            var card = await cardService.Get(link);

            if (card == null)
                return NotFound();

            return Ok(mapper.Map<CardModel>(card));
        }
    }
}
