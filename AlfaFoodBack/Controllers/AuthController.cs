using System;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        [HttpPost("phys")]
        public async void AuthPhys(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var user = UserRepository.IsAuth(email, password, dbCon);
                    if (user == null)
                    {
                        Response.StatusCode = 400;
                        await Response.WriteAsync("Incorrect login or password");
                    }
                    else
                    {
                        if (user.Role != "none")
                        {
                            Response.StatusCode = 403;
                            await Response.WriteAsync("You can't see this page");
                            return;
                        }

                        Response.StatusCode = 200;
                        Response.Cookies.Append("username", user.Username);
                        Response.Cookies.Append("userId", user.Id.ToString());
                        Response.Cookies.Append("role", user.Role);
                    }
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpPost("jur")]
        public async void AuthJur(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var user = UserRepository.IsAuth(email, password, dbCon);
                    if (user == null)
                    {
                        Response.StatusCode = 400;
                        await Response.WriteAsync("Incorrect login or password");
                    }
                    else
                    {
                        if (user.Role != "owner")
                        {
                            Response.StatusCode = 403;
                            await Response.WriteAsync("You can't see this page");
                            return;
                        }

                        Response.StatusCode = 200;
                        Response.Cookies.Append("username", user.Username);
                        Response.Cookies.Append("role", user.Role);
                    }
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