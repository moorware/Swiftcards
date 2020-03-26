using System.Collections.Generic;

namespace Swiftcards.Data.Entities
{
    public class UserEntity : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        public List<CardEntity> Cards { get; set; }
    }
}
