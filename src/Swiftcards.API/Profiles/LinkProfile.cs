using AutoMapper;
using Swiftcards.API.Models.Links;
using Swiftcards.Data.Entities;

namespace Swiftcards.API.Profiles
{
    public class LinkProfile : Profile
    {
        public LinkProfile()
        {
            CreateMap<LinkModel, LinkEntity>();
            CreateMap<LinkEntity, LinkModel>();
        }
    }
}
