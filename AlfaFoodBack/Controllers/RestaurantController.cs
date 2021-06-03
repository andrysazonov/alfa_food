using System;
using System.Collections.Generic;
using System.Text;
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
            var dict = JObject.Parse(data.ToString())["data"];

            var businessId = int.Parse(dict["businessId"].ToString());
            var name = dict["name"].ToString();
            var description = dict["description"].ToString();
            var city = dict["city"].ToString();
            var address = dict["address"].ToString();
            var phoneNumber = dict["phone"].ToString();
            var workingTime = dict["workingTime"].ToString();
            var ownerId = dict["userId"].ToString();
            var image = dict["image-map"];

            try
            {
                var restaurant = new Restaurant(businessId, name, city, address, description,1 ,  phoneNumber, workingTime); //ownerId,
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

        [HttpGet("all")]
        public List<Restaurant> GetAllRestaurants()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var restaurants = new List<Restaurant>();
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurantRepositoryResponce = new RestaurantRepository().GetAllRestaurants(dbCon);
                    foreach (var i in restaurantRepositoryResponce)
                        restaurants.Add(i as Restaurant);
                    Response.StatusCode = 201;
                }

            }
            catch (Exception e)
            {
                Response.WriteAsync(e.Message);
                Response.StatusCode = 400;
            }

            return restaurants;
        }

        [HttpGet("{restaurantId:int}")]
        public async void GetRestaurantById(int restaurantId)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetById(dbCon, restaurantId);
                    var json = JsonConvert.SerializeObject(restaurants);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                    Response.StatusCode = 200;

                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("owner/{ownerId:int}")]
        public async void GetOwnersRestaurants(int ownerId)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetByOwnerId(dbCon, ownerId);
                    var json = JsonConvert.SerializeObject(restaurants);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                    Response.StatusCode = 200;

                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("city/{cityName:string}")]
        public async void GetRestaurantsInCity(string cityName)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetInCity(dbCon, cityName);
                    var json = JsonConvert.SerializeObject(restaurants);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                    Response.StatusCode = 200;
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