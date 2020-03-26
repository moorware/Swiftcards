using System.Collections.Generic;

namespace Swiftcards.Data.Entities
{
    public class CardEntity : IEntity
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public string Name { get; set; }
        public string Annotation { get; set; }
        public List<LinkEntity> Links { get; set; }

        public int UserEntityId { get; set; }
        public UserEntity UserEntity { get; set; }
    }
}
