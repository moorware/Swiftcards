using Swiftcards.Data.Entities;
using System.Threading.Tasks;

namespace Swiftcards.Data.Services
{
    public interface ICardService
    {
        Task<CardEntity> Get(string link);
        Task<bool> Create(CardEntity card);
        Task<bool> Update(CardEntity card);
        Task<bool> Delete(string link, UserEntity user);
    }
}
