using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreApplication.Infrastructure;
using CoreApplication.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CoreApplication.Models
{
    public static class SeedData
    {
       
        public static async Task InitializeDB(IServiceProvider services)
        {
            ApplicationContext context = services.GetRequiredService<ApplicationContext>();
            var userManager = services.GetRequiredService<UserManager<UserIdentity>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();


           //context.Database.Migrate();

            if (!context.Authors.Any())
            {
                context.Authors.AddRange(

                    new Author
                    {
                        
                        Name = "А.Торубаров"
                    },
                    new Author
                    {
                       
                        Name = "А.Наст"
                    },
                    new Author
                    {
                       
                        Name = "Л.Андреев"
                    },
                    new Author
                    {
                       
                        Name = "А.Грин"
                    },
                    new Author
                    {
                        
                        Name = "Эдгар Аллан По"
                    },
                    new Author
                    {
                        
                        Name = "Лев Троцкий"
                    }

                    );

                context.SaveChanges();
            }

            if (!context.Genres.Any())
            {
                context.Genres.AddRange(
                    new Genre
                    {
                        
                        GenreName = "Детективы"
                    },
                    new Genre
                     {
                         
                         GenreName = "Зарубежная литература"
                     },
                    new Genre
                      {
                         
                          GenreName = "Наука и образование"
                      },
                     new Genre
                       {
                           
                           GenreName = "Повести, рассказы"
                       },
                     new Genre
                        {
                           
                            GenreName = "Поэзия и драматургия"
                        },
                     new Genre
                         {
                          
                             GenreName = "Приключения"
                         },
                     new Genre
                          {
                            
                              GenreName = "Документальная литература"
                          }

                    );
                context.SaveChanges();
            }

            if (!context.Books.Any())
            {
                context.Books.AddRange(
                    new Book
                    {
                        Title = "Беглец",
                        Year = 2018,
                        GenreId = 6,
                        AuthorId = 1,
                        Count = 44
                    },
                    new Book
                    {
                        Title = "Оскал тьмы",
                        Year = 2018,
                        GenreId = 6,
                        AuthorId = 2,
                        Count = 50
                    },
                    new Book
                    {
                        Title = "Ночь перед Рождеством",
                        Year = 2017,
                        GenreId = 4,
                        AuthorId = 3,
                        Count = 60
                    },
                    new Book
                    {
                        Title = "Bookkkk",
                        Year = 2011,
                        GenreId = 6,
                        AuthorId = 2
                    },
                    new Book
                    {
                        Title = "Алые паруса ",
                        Year = 2012,
                        GenreId = 4,
                        AuthorId = 4,
                        Count = 10
                    },
                    new Book
                    {
                        Title = "Морские волки",
                        Year = 2018,
                        GenreId = 4,
                        AuthorId = 4,
                        Count=5
                    },
                     new Book
                     {
                         Title = "Черный кот",
                         Year = 2018,
                         GenreId = 1,
                         AuthorId = 5,
                         Count = 15
                     },
                      new Book
                      {
                          Title = "Таинственные рассказы",
                          Year = 2018,
                          GenreId = 1,
                          AuthorId = 5,
                          Count = 20
                      },
                       new Book
                       {
                           Title = "Без дыхания",
                           Year = 2018,
                           GenreId = 1,
                           AuthorId = 5,
                           Count = 5
                       },
                        new Book
                        {
                            Title = "Морские волки",
                            Year = 2018,
                            GenreId = 4,
                            AuthorId = 4,
                            Count = 5
                        },
                         new Book
                         {
                             Title = "Золотой жук",
                             Year = 2018,
                             GenreId = 1,
                             AuthorId = 5,
                             Count = 70
                         }

                    );
                context.SaveChanges();

            }

            if (!context.ApplicationMenus.Any())
            {
                context.ApplicationMenus.AddRange(

                    new ApplicationMenu
                    {
                       
                        ApplicationMenuTitle = "Библиотека"
                    },
                    new ApplicationMenu
                    {
                        
                        ApplicationMenuTitle = "Мои книги"
                    },
                    new ApplicationMenu
                    {
                        
                        ApplicationMenuTitle = "Редактирование"
                    },
                    new ApplicationMenu
                    {
                        
                        ApplicationMenuTitle = "Прием / Выдача"
                    }
                );

                context.SaveChanges();
            }
                  
            if (await roleManager.FindByNameAsync(Role.Admin) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Role.Admin));
            }
            if (await roleManager.FindByNameAsync(Role.Librarian) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Role.Librarian));
            }
            if (await roleManager.FindByNameAsync(Role.User) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Role.User));
            }
            if (await roleManager.FindByNameAsync(Role.Storekeeper) == null)
            {
                await roleManager.CreateAsync(new IdentityRole(Role.Storekeeper));
            }
            

            if (await userManager.FindByNameAsync("admin") == null)
            {
                string password = "aaa";

                UserIdentity admin = new UserIdentity { UserName = "admin"};
                IdentityResult result = await userManager.CreateAsync(admin, password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, Role.Admin);
                }
            }
        

        }

    }
}
