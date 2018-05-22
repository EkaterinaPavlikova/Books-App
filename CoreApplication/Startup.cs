using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CoreApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace CoreApplication
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {          
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<UserIdentity, IdentityRole>(opts =>
            {
                opts.Password.RequiredLength = 3;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = false;

            }
                )
                .AddEntityFrameworkStores<ApplicationContext>();       

            services.AddTransient<IAccountRepository, EFAccountRepository>();
            services.AddTransient<IBookRepository, EFBookRepository>();
            services.AddTransient<IGenreRepository, EFBookRepository>();
            services.AddTransient<IAuthorRepository, EFBookRepository>();
            services.AddTransient<IOrderRepository, EFOrderRepository>();
            services.AddScoped<Cart>(sp => SessionCart.GetCart(sp));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
           
            services.AddMvc();
            services.AddSession();
         
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();              
            }
            
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSession();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                // routes.MapRoute(
                //     name: "default",
                //     template: "{controller=Home}/{action=Index}/{id?}");

                // routes.MapSpaFallbackRoute(
                //     name: "spa-fallback",
                //     defaults: new { controller = "Home", action = "Index" });
            });


        }      
    }
}
