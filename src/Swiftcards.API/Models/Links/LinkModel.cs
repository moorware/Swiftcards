using System.ComponentModel.DataAnnotations;

namespace Swiftcards.API.Models.Links
{
    public class LinkModel
    {
        [Required, StringLength(10)]
        public string Title { get; set; }

        [Required]
        public string URL { get; set; }
    }
}
