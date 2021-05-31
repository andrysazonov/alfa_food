using System;
using System.Collections.Generic;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class RestaurantRepository : IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var restaurant = entity as Restaurant;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO restaurants (id, name, city, address, description, ownerId, phoneNumber, workingTime, published) VALUES('{restaurant.Id}', '{restaurant.Name}','{restaurant.City}', '{restaurant.Address}', '{restaurant.Description}', '{restaurant.OwnerId}', '{restaurant.PhoneNumber}',  '{restaurant.WorkingTime}', '{restaurant.Published}')";
            command.ExecuteNonQuery();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(NpgsqlConnection dbCon, int id)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT *" +
                                  "FROM \"public\".\"Restaurants\"" +
                                  $"WHERE id = {id}";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                return null;

            reader.Read();
            var responceId = int.Parse(reader[1].ToString());
            var name = reader[2].ToString();
            var city = reader[3].ToString();
            var address = reader[4].ToString();
            var description = reader[5].ToString();
            var ownerId = int.Parse(reader[6].ToString());
            var phone = reader[7].ToString();
            var workingTime = reader[8].ToString();
            reader.Close();

            return new Restaurant(responceId, name, city, address, description, ownerId, phone, workingTime);
        }

        public IEnumerable<IDbEntity> GetRestaurantsByOwnerId(NpgsqlConnection dbCon, int ownerId)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT *" +
                                  "FROM \"public\".\"Restaurants\"" +
                                  $"WHERE ownerId = {ownerId}";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
               yield return null;
           
            while (reader.Read())
            {
                var responeId = int.Parse(reader[1].ToString());
                var name = reader[2].ToString();
                var city = reader[3].ToString();
                var address = reader[4].ToString();
                var description = reader[5].ToString();
                var responeOwnerId = int.Parse(reader[6].ToString());
                var phone = reader[7].ToString();
                var workingTime = reader[8].ToString();
                reader.Close();

                yield return new Restaurant(responeId, name, city, address, description, responeOwnerId, phone, workingTime);
            }
        }
    }
}