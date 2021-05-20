﻿using System;
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
                $"INSERT INTO public.\"Restaurants\" (ownerId, name, phone, address, description, city) VALUES({restaurant.OwnerId}, {restaurant.Name}, {restaurant.PhoneNumber}, {restaurant.Address}, {restaurant.Description}, {restaurant.City})";
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
            var name = reader[1].ToString();
            var description = reader[2].ToString();
            var address = reader[3].ToString();
            var phone = reader[4].ToString();
            var ownerId = int.Parse(reader[5].ToString());
            var city = reader[6].ToString();
            reader.Close();
            return new Restaurant(ownerId, name, city, address, description, phone, id);
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
                var id = int.Parse(reader[0].ToString());
                var name = reader[1].ToString();
                var description = reader[2].ToString();
                var address = reader[3].ToString();
                var phone = reader[4].ToString();
                var city = reader[6].ToString();
                reader.Close();
                yield return new Restaurant(ownerId, name, city, address, description, phone, id);
            }
           
        }
    }
}