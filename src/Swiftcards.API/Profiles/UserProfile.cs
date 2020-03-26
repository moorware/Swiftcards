using AutoMapper;
using Swiftcards.API.Models.Users;
using Swiftcards.Data.Entities;

namespace Swiftcards.API.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserEntity, UserModel>();
        }
    }
}
