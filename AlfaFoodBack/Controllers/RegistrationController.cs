﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("register")]
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
                }

                using (var dbCon = PostgresConn.GetConn())
                {
                    user = UserRepository.IsAuth(user.Email, user.Password, dbCon);
                }
                var now = DateTime.UtcNow;
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email));
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role));
                var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                Response.StatusCode = 200;
                var json = JsonConvert.SerializeObject(user);
                Response.Cookies.Append("token", encodedJwt);
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                
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
            var role = "owner";
            try
            {
                user = new User(email, password, username, phone, role);
                using (var dbCon = PostgresConn.GetConn())
                {
                    new UserRepository().Insert(dbCon, user);
                    Response.StatusCode = 201;
                }
                using (var dbCon = PostgresConn.GetConn())
                {
                    user = UserRepository.IsAuth(email, password, dbCon);
                }
                var now = DateTime.UtcNow;
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email));
                claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role));
                var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                var json = JsonConvert.SerializeObject(user);
                Response.StatusCode = 200;
                Response.Cookies.Append("token", encodedJwt);
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }
    }
}