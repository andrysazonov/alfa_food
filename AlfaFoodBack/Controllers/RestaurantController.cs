using System;
using System.Collections.Generic;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            //var dict = JObject.Parse(data.ToString());
            //var dict1 = JObject.Parse(data.ToString()).First; // 
            //var dict2 = JsonConvert.DeserializeObject<Dictionary<string, object>>(data.ToString()); // слишком сложно
            //var dict3 = JArray.Parse(dict1.ToString());
            // var dict4 = JProperty.Parse(data.ToString()); // ненужное
            var dict = JObject.Parse(data.ToString())["data"];

            var businessId = int.Parse(dict["businessId"].ToString());
            var name = dict["name"].ToString();
            var description = dict["description"].ToString();
            var city = dict["city"].ToString();
            var address = dict["address"].ToString();
            var phoneNumber = dict["phone"].ToString();
            var workingTime = dict["workingTime"].ToString();
            //var ownerId = int.Parse(Request.Cookies["userId"]);
            var image = dict["image-map"];

            try
            {
                var restaurant = new Restaurant(businessId, name, city, address, description,1,  phoneNumber, workingTime); //ownerId,
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