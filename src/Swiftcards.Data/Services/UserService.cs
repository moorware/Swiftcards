using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swiftcards.Data.Entities;
using Swiftcards.Data.Helpers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Swiftcards.Data.Services
{
    public class UserService : IUserService
    {
        private DataContext dataContext;
        private JWTSettings jwtSettings;

        public UserService(DataContext dataContext, IOptions<JWTSettings> jwtSettings)
        {
            this.dataContext = dataContext;
            this.jwtSettings = jwtSettings.Value;
        }

        public async Task<UserEntity> Authenticate(string name, string password)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Name == name && x.Password == password);

            if (user == null)
                return null;

            var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.Name)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMonths(1),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
                );

            user.Token = new JwtSecurityTokenHandler().WriteToken(token);

            return user;
        }

        public async Task<UserEntity> Register(string name, string password)
        {
            if (await dataContext.Users.AnyAsync(x => x.Name == name))
                return null;

            var user = new UserEntity()
            {
                Name = name,
                Password = password
            };

            await dataContext.Users.AddAsync(user);
            await dataContext.SaveChangesAsync();

            return await Authenticate(name, password);
        }

        public async Task<UserEntity> Get(string name) => await dataContext.Users
            .Include(x => x.Cards)
            .ThenInclude(x => x.Links)
            .FirstOrDefaultAsync(x => x.Name == name);
    }
}
