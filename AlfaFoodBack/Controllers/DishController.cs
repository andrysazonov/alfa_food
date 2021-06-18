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
        public async void AddDish()
        {
            Request.Form.TryGetValue("name", out var nameField);
            Request.Form.TryGetValue("ingredients", out var ingredientsField);
            Request.Form.TryGetValue("price", out var priceField);
            Request.Form.TryGetValue("weightInGrams", out var weightInGramsField);
            Request.Form.TryGetValue("restaurantId", out var restaurantIdField);

            var name = nameField.ToString();
            var ingredients = ingredientsField.ToString();
            var price = decimal.Parse(priceField.ToString());
            var weightInGrams = decimal.Parse(weightInGramsField.ToString());
            var restaurantId = restaurantIdField.ToString();

            var image = Request.Form.Files.GetFile("image");
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            try
            {
                var dish = new Dish(name, ingredients, price, weightInGrams, Guid.Parse(restaurantId.ToString()), fileBytes);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new DishRepository().Insert(dbCon, dish);
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