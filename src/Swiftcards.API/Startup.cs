using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Swiftcards.Data;
using Swiftcards.Data.Helpers;
using Swiftcards.Data.Services;

namespace Swiftcards.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();

            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            var jwtSettingsSection = Configuration.GetSection("JWTSettings");
            services.Configure<JWTSettings>(jwtSettingsSection);

            var jwtSettings = jwtSettingsSection.Get<JWTSettings>();
            var jwtKey = Encoding.ASCII.GetBytes(jwtSettings.Secret);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(x =>
                {
                    x.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(jwtKey),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services
                .AddScoped<IUserService, UserService>()
                .AddScoped<ICardService, CardService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseHttpsRedirection();

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404)
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
