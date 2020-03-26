using AutoMapper;
using Swiftcards.API.Models.Cards;
using Swiftcards.Data.Entities;

namespace Swiftcards.API.Profiles
{
    public class CardProfile : Profile
    {
        public CardProfile()
        {
            CreateMap<CardModel, CardEntity>();
            CreateMap<CardEntity, CardModel>();
        }
    }
}
