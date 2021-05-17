using System;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : Controller
    {
        [HttpPost("phys")]
        public async void RegisterPhys(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            User user;
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            var phone = dict["phone"].ToString();
            var username = dict["username"].ToString();
            try
            {
                user = new User(email, password, username, phone);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new UserRepository().Insert(dbCon, user);
                    Response.StatusCode = 201;
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpPost("jur")]
        public async void RegisterJur(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            User user;
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            var phone = dict["phone"].ToString();
            var username = dict["username"].ToString();
            var role = dict["role"].ToString();
            try
            {
                user = new User(email, password, username, phone, role);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new UserRepository().Insert(dbCon, user);
                    Response.StatusCode = 201;
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }
    }
}