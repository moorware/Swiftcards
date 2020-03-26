using Swiftcards.Data.Entities;
using System.Threading.Tasks;

namespace Swiftcards.Data.Services
{
    public interface IUserService
    {
        Task<UserEntity> Authenticate(string name, string password);
        Task<UserEntity> Register(string name, string password);
        Task<UserEntity> Get(string name);
    }
}
