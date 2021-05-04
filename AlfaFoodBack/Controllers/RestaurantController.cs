using System;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestaurantController : Controller
    {
        [HttpPost("add")]
        public async void AddRestaurant(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());
            var name = dict["name"].ToString();
            var description = dict["description"].ToString();
            var address = dict["address"].ToString();
            var phone = dict["phone"].ToString();
            var ownerId = int.Parse(Request.Cookies["userId"]);
            try
            {
                var restaurant = new Restaurant(ownerId, name, address, description, phone);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new RestaurantRepository().Insert(dbCon, restaurant);
                    Response.StatusCode = 201;
                }
            }
            catch (Exception e)
            {
                await Response.WriteAsync(e.Message);
                Response.StatusCode = 400;
            }
        }
    }
}