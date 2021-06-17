using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DishController : Controller
    {
        [HttpPost("add")]
        public async void AddDish(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());

            var id = int.Parse(dict["id"].ToString());
            var name = dict["name"].ToString();
            var ingredients = dict["ingredients"].ToString();
            var price = decimal.Parse(dict["price"].ToString());
            var weightInGrams = decimal.Parse(dict["weightInGrams"].ToString());
            var restaurantId = Guid.Parse(dict["restaurantId"].ToString());

            try
            {
                var dish = new Dish(id, name, ingredients, price, weightInGrams, restaurantId);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new RestaurantRepository().Insert(dbCon, dish);
                }
                Response.StatusCode = 201;
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpGet("{dishId:int}")]
        public async void GetDishById(int dishId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var dish = new DishRepository().GetById(dbCon, dishId);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(dish, serializerSettings);
                    Response.StatusCode = 200;

                    if (!(dish == null || json.Contains("[null]")))
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }
    }
}