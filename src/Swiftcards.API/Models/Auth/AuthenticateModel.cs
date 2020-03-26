using System.ComponentModel.DataAnnotations;

namespace Swiftcards.API.Models.Auth
{
    public class AuthenticateModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
