using System.ComponentModel.DataAnnotations;

namespace Swiftcards.API.Models.Auth
{
    public class RegisterModel
    {
        [Required, StringLength(15, MinimumLength = 4)]
        [RegularExpression("[a-zA-Z0-9._]*")]
        public string Name { get; set; }

        [Required, StringLength(30, MinimumLength = 6)]
        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
