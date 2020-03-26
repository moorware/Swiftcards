using Swiftcards.API.Models.Links;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Swiftcards.API.Models.Cards
{
    public class CardModel
    {
        [Required, StringLength(10, MinimumLength = 5)]
        [RegularExpression("[a-zA-Z0-9]*")]
        public string Link { get; set; }

        [Required, StringLength(20)]
        public string Name { get; set; }

        [Required, StringLength(80)]
        public string Annotation { get; set; }

        [Required, MinLength(1)]
        public List<LinkModel> Links { get; set; }
    }
}
