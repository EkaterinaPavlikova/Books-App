using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreApplication.Models;
using CoreApplication.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using CoreApplication.Infrastructure;

namespace CoreApplication.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AccountController : Controller
    {
        private IAccountRepository repository;
        private readonly UserManager<UserIdentity> _userManager;
        private readonly SignInManager<UserIdentity> _signInManager;
        private RoleManager<IdentityRole> _roleManager;
        private IServiceProvider _service;



        public AccountController(IAccountRepository repo, UserManager<UserIdentity> userManager, SignInManager<UserIdentity> signInManager, RoleManager<IdentityRole> roleManager, IServiceProvider services)
        {
            repository = repo;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _service = services;
        }
       

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<Object> Login([FromBody]RegisterModel model)
        {
           
            HttpContext.Session.Clear();
            //RegisterModel model = new RegisterModel { Login = "admin", Password = "aaa"};
            var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, false, false);

            if (result.Succeeded)
            {
                var roles = ((ClaimsIdentity)User.Identity).Claims
                 .Where(c => c.Type == ClaimTypes.Role)
                     .Select(c => c.Value).ToList();

                //List<string> menuTitles = await GetUserMenu(roles);
                List<string> menuTitles = await GetUserMenu(new List<string> { Role.Admin});
                while (menuTitles.Count() == 0) { }
                return Ok(new LoginModel { Login = model.Login, Role = Role.User, MenuItems = String.Join(", ", menuTitles.ToArray()) });

            }
            else
            {
                return BadRequest(result);
            }



        }

        public async Task<List<string>> GetUserMenu(List<string> userRoles)
        {
            List<string> titles = new List<string>();

            foreach (var roleName in userRoles)
            {
                IdentityRole role = await _roleManager.FindByNameAsync(roleName);
                var menus = repository.getUserMenu(role.Id);

                foreach (var menuItem in menus)
                {
                    var title = menuItem.ApplicationMenu.ApplicationMenuTitle;
                    if (!titles.Contains(title))
                        titles.Add(title);
                }

            }

            return titles;
        }


        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<Object> Register([FromBody]RegisterModel model)
        {

            UserIdentity user = new UserIdentity { UserName = model.Login };
            var result = await _userManager.CreateAsync(user, model.Password);


            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Role.User);
                await _signInManager.SignInAsync(user, false);
                List<string> menuTitles = await GetUserMenu(new List<string> { Role.User });
                while (menuTitles.Count() == 0) { }
                return Ok(new LoginModel { Login = model.Login, Role = Role.User, MenuItems = String.Join(", ", menuTitles.ToArray()) });
                

            }
            else
            {
                return BadRequest(result.Errors);
            }

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            HttpContext.Session.Clear();
            return Ok();
        }
    }


    



}
