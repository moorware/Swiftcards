using Microsoft.EntityFrameworkCore;
using Swiftcards.Data.Entities;
using System.Threading.Tasks;

namespace Swiftcards.Data.Services
{
    public class CardService : ICardService
    {
        private DataContext dataContext;

        public CardService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<bool> Create(CardEntity card)
        {
            if (await dataContext.Cards.AnyAsync(x => x.Link == card.Link))
                return false;

            await dataContext.Cards.AddAsync(card);
            await dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Update(CardEntity card)
        {
            var _card = await dataContext.Cards.FirstOrDefaultAsync(x => x.Link == card.Link);

            if (_card == null || _card.UserEntity.Name != card.UserEntity.Name)
                return false;

            _card.Name = card.Name;
            _card.Annotation = card.Annotation;
            _card.Links = card.Links;

            dataContext.Cards.Update(_card);
            await dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(string link, UserEntity user)
        {
            var card = await dataContext.Cards.FirstOrDefaultAsync(x => x.Link == link);

            if (card == null || card.UserEntity.Name != user.Name)
                return false;

            dataContext.Cards.Remove(card);
            await dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<CardEntity> Get(string link) => await dataContext.Cards
            .Include(x => x.UserEntity)
            .Include(x => x.Links)
            .FirstOrDefaultAsync(x => x.Link == link);
    }
}
