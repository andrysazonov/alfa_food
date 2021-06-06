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
            var dict = JObject.Parse(data.ToString());

            var businessId = int.Parse(dict["businessId"].ToString());
            var name = dict["name"].ToString();
            var description = dict["description"].ToString();
            var city = dict["city"].ToString();
            var address = dict["address"].ToString();
            var phoneNumber = dict["phone"].ToString();
            var workingTime = dict["workingTime"].ToString();
            var ownerId = int.Parse(dict["userId"].ToString());

            try
            {
                var restaurant = new Restaurant(businessId, name, city, address, description, ownerId,  phoneNumber, workingTime, false); 
                using (var dbCon = PostgresConn.GetConn())
                {
                    new RestaurantRepository().Insert(dbCon, restaurant);
                    Response.StatusCode = 201;
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(restaurant.Id.ToString()));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        //[HttpPost("add/image/{id}")]
        //public async void AddImage(string id)
        //{
        //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
        //    var dict = JObject.Parse(data.ToString())["data"];

        //    var businessId = int.Parse(dict["businessId"].ToString());
        //    var name = dict["name"].ToString();
        //    var description = dict["description"].ToString();
        //    var city = dict["city"].ToString();
        //    var address = dict["address"].ToString();
        //    var phoneNumber = dict["phone"].ToString();
        //    var workingTime = dict["workingTime"].ToString();
        //    var ownerId = int.Parse(dict["userId"].ToString());

        //    try
        //    {
        //        var restaurant = new Restaurant(businessId, name, city, address, description, ownerId, phoneNumber, workingTime);
        //        using (var dbCon = PostgresConn.GetConn())
        //        {
        //            new RestaurantRepository().Insert(dbCon, restaurant);
        //            await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(restaurant.Id.ToString()));
        //            Response.StatusCode = 201;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        await Response.WriteAsync(e.Message);
        //        Response.StatusCode = 400;
        //    }
        //}


        [HttpGet("all")]
        public async void GetAllRestaurants()
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetAllRestaurants(dbCon);
                    var json = JsonConvert.SerializeObject(restaurants);
                    Response.StatusCode = 200;
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("{restaurantId:Guid}")]
        public async void GetRestaurantById(Guid restaurantId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetById(dbCon, restaurantId);
                    var json = JsonConvert.SerializeObject(restaurants);
                    Response.StatusCode = 200;
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("owner/{ownerId:int}")]
        public async void GetRestaurantByOwnerId(int ownerId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetByOwnerId(dbCon, ownerId);
                    var json = JsonConvert.SerializeObject(restaurants);
                    Response.StatusCode = 200;
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("city/{cityName}")]
        public async void GetRestaurantsInCity(string cityName)
        {
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