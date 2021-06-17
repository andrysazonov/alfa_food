using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using AlfaFoodBack;
using AlfaFoodBack.Models;
using Newtonsoft.Json;

namespace SignalRApp
{
    public class ApplicationHub : Hub
    {
        public async Task ReceiveApplications()
        {
            var json = "";
            using (var dbCon = PostgresConn.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = @"SELECT * FROM ""public"".""restaurants"" WHERE published=false";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    await this.Clients.All.SendAsync("Send", "");
                var restaurants = new List<(string, Guid)>();
                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    // var city = reader.GetString("city");
                    // var address = reader.GetString("address");
                    // var description = reader.GetString("description");
                    // var ownerId = reader.GetInt32("ownerId");
                    // var businessId = reader.GetInt32("businessId");
                    // var published = reader.GetBoolean("published");
                    // var phone = reader.GetString("phoneNumber");
                    // var workingTime = default(string);
                    // if (!reader.IsDBNull("workingTime"))
                    //     workingTime = reader.GetString("workingTime");
                    // var email = default(string);
                    // if (!reader.IsDBNull("email"))
                    //     email = reader.GetString("email");
                    var id = reader.GetGuid("id");
                    // var imageMap = default(byte[]);
                    // if (!reader.IsDBNull("imageMap"))
                    //     imageMap = reader.GetFieldValue<byte[]>("imageMap");

                    restaurants.Add((name, id));
                }
                json = JsonConvert.SerializeObject(restaurants);
                Console.WriteLine(json);
            }
            
            await this.Clients.All.SendAsync("ReceiveApplications", json);
        }
    }
}