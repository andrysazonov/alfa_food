﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO.Pipelines;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
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
    [Route("[controller]")]
    public class AuthController : Controller
    {
        [HttpDelete("jur")]
        public async void LogOut()
        {
            try
            {
                if (Request.Cookies["Key"] != null)
                {
                    Response.Cookies.Append("token", "", new CookieOptions(){Expires = DateTime.Now.AddDays(-1d)});
                }
                Response.StatusCode = 200;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Response.StatusCode = 400;
            }
        }
        
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
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                        Response.Cookies.Append("token", encodedJwt);
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
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                        Response.Cookies.Append("token", encodedJwt);
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