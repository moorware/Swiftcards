namespace Swiftcards.Data.Entities
{
    public class LinkEntity : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }

        public int CardEntityId { get; set; }
        public CardEntity CardEntity { get; set; }
    }
}
