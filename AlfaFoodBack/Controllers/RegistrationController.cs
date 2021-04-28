using System;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Web.Http.Cors;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : Controller
    {
        [HttpPost("phys")]
        public void RegisterPhys(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            User user;
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            var phone = dict["phone"].ToString();
            var username = dict["username"].ToString();
            Console.WriteLine(email);
            Console.WriteLine(password);
            Console.WriteLine(phone);
            Console.WriteLine(username);
            try
            {
                user = new User(email, password, username, username, phone);
                using (var dbCon = DBUtils.GetDBConnection())
                {
                    new UserRepository().Insert(dbCon, user);
                    Response.StatusCode = 201;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Response.StatusCode = 400;
                Response.WriteAsync(e.Message);
            }
            
        }
        
    }
}