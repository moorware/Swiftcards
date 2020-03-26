using Swiftcards.API.Models.Cards;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Swiftcards.API.Models.Users
{
    public class UserModel
    {
        public string Name { get; set; }
        public List<CardModel> Cards { get; set; }
    }
}
