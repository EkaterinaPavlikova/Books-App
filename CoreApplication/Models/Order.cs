using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreApplication.Models
{
    public class Order
    {
       
        public int OrderId { get; set; }
               
        public string ReaderId { get; set; }

        [ForeignKey("ReaderId")]
        public UserIdentity UserIdentity { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public BookStatus Status { get; set; }

    }

    public enum BookStatus
    {
       Processing,
       Issued,
       OnReturn
    }
}
