using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreApplication.Models.ViewModels
{
    public class LoginModel
    {
        
        public string Login { get; set; }    
        public string Role { get; set; }
        public string MenuItems { get; set; }

     
    }
}
