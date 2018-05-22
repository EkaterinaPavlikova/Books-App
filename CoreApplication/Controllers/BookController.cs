using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreApplication.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using CoreApplication.Infrastructure;

namespace CoreApplication.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BookController: Controller
    {
        private IBookRepository repository;
        private IAuthorRepository authorRepositore;
        private IGenreRepository genreRepository;


        public int PageSize = 2;
        public int PageSizeForEditPage = 7;

        public BookController(IBookRepository bookRepository, IAuthorRepository authorRepositore, IGenreRepository genreRepository)
        {           
            repository = bookRepository;
            this.authorRepositore = authorRepositore;
            this.genreRepository = genreRepository;
        }

        [HttpGet("[action]")]
        public ActionResult BooksList(string searchString = "",   int Page = 1, int? genre = null)
        {
         
             IQueryable<Book> books = repository.Books.Where(p => genre == null || p.GenreId == genre).Where(b => b.Count > 0);
             if (!String.IsNullOrEmpty(searchString))
            {
                books = books.Where(b => b.Title.Contains(searchString) || b.Author.Name.Contains(searchString) || b.Genre.GenreName.Contains(searchString) || b.Year.ToString().Contains(searchString));                                          
            }


            return Ok(new BooksListViewModel {
                            Books =  books.OrderBy(b => b.Id)
                                                  .Skip((Page - 1) * PageSize)
                                                  .Take(PageSize),

                            PagingInfo = new PagingInfo
                            {
                                CurrentPage = Page,
                                ItemsPerPage = PageSize,
                                TotalItems = books.Count()
                            },
                            CurrentGenreId = genre,
                            SearchingString = searchString
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<Book>BooksEditPage(int p = 1)
        {
            IEnumerable < Book > books = repository.Books;
            return (books);
            //return (new BooksListViewModel { 
            //    Books = books.OrderBy(b => b.Id)
            //                                      .Skip((p - 1) * PageSizeForEditPage)
            //                                      .Take(PageSizeForEditPage),
            //    PagingInfo = new PagingInfo
            //    {
            //        CurrentPage = p,
            //        ItemsPerPage = PageSizeForEditPage,
            //        TotalItems = books.Count()
            //    }

            //});
        }

       
       
        [HttpPost("[action]")]
        public ActionResult Edit([FromBody]Book book)
        {
            try
            {
                repository.Update(book);
                repository.Save();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
     
        [HttpPost("[action]")]
        public ActionResult Create([FromBody]Book book)
        {
            try
            {
                repository.Create(book);
                repository.Save();

                return Ok(); ;
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Book book = repository.Get(id);
            if(book!= null)
            {
                repository.Delete(id);
                repository.Save();
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
            
        }

    }
}
