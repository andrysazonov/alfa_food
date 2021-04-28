using System;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : Controller
    {
        [HttpPost("phys")]
        public IActionResult RegisterPhys(string login, string password, string name, string surname,
            string phoneNumber = null)
        {
            User user;
            Console.WriteLine("SEKa");
            try
            {
                user = new User(login, password, name, surname, phoneNumber);
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }

            using (var dbCon = DBUtils.GetDBConnection())
            {
                return user.Insert(dbCon);
            }
        }
        
    }
}