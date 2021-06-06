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
                $"INSERT INTO restaurants (id, businessId, name, city, address, description, ownerId, phoneNumber, workingTime, published) " +
                $"VALUES('{restaurant.Id}', '{restaurant.BusinessId}', '{restaurant.Name}','{restaurant.City}', '{restaurant.Address}', '{restaurant.Description}', '{restaurant.OwnerId}', '{restaurant.PhoneNumber}',  '{restaurant.WorkingTime}', '{restaurant.Published}')";
            command.ExecuteNonQuery();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var restaurant = entity as Restaurant;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"UPDATE restaurants" +
                $"SET " +
                    $"businessId='{restaurant.BusinessId}', name='{restaurant.Name}', city='{restaurant.City}'," +
                    $"address='{restaurant.Address}', ' description={restaurant.Description}', ownerId='{restaurant.OwnerId}'," +
                    $"phoneNumber='{restaurant.PhoneNumber}',  workingTime='{restaurant.WorkingTime}', published='{restaurant.Published}')" +
                $"WHERE id='{restaurant.Id}'";
            command.ExecuteNonQuery();
        }

        public IDbEntity GetById(NpgsqlConnection dbCon, Guid id)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT * FROM \"restaurants\" WHERE \"id\" = '{id}'";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                return null;

            reader.Read();


            var name = reader.GetString("name");
            var city = reader.GetString("city");
            var address = reader.GetString("address");
            var description = reader.GetString("description");
            var ownerId = reader.GetInt32("ownerId");
            var businessId = reader.GetInt32("businessId");
            var published = reader.GetBoolean("published");
            var phone = reader.GetString("phoneNumber");
            var workingTime = default(string);
            if (!reader.IsDBNull("workingTime"))
                workingTime = reader.GetString("workingTime");

            reader.Close();
            return new Restaurant(businessId, name, city, address, description, ownerId, phone, workingTime, published, id);
        }

        public IEnumerable<IDbEntity> GetByOwnerId(NpgsqlConnection dbCon, int ownerId)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT * FROM \"restaurants\" WHERE \"ownerid\" = {ownerId}";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                yield return null;

            while (reader.Read())
            {
                var name = reader.GetString("name");
                var city = reader.GetString("city");
                var address = reader.GetString("address");
                var description = reader.GetString("description");
                var ownerIdResponce = reader.GetInt32("ownerId");
                var businessId = reader.GetInt32("businessId");
                var published = reader.GetBoolean("published");
                var phone = reader.GetString("phoneNumber");
                var workingTime = default(string);
                if (!reader.IsDBNull("workingTime"))
                    workingTime = reader.GetString("workingTime");

                var id = reader.GetGuid("id");
                yield return new Restaurant(businessId, name, city, address, description, ownerIdResponce, phone, workingTime, published, id);
            }

            reader.Close();
        }

        public IEnumerable<IDbEntity> GetAllRestaurants(NpgsqlConnection dbCon)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = "SELECT * FROM \"restaurants\" ";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                yield return null;

            while (reader.Read())
            {
                var name = reader.GetString("name");
                var city = reader.GetString("city");
                var address = reader.GetString("address");
                var description = reader.GetString("description");
                var ownerId = reader.GetInt32("ownerId");
                var businessId = reader.GetInt32("businessId");
                var published = reader.GetBoolean("published");
                var phone = reader.GetString("phoneNumber");
                var workingTime = default(string);
                if (!reader.IsDBNull("workingTime"))
                    workingTime = reader.GetString("workingTime");
                var id = reader.GetGuid("id");

                yield return new Restaurant(businessId, name, city, address, description, ownerId, phone, workingTime, published, id);
            }

            reader.Close();
        }

        public IEnumerable<IDbEntity> GetInCity(NpgsqlConnection dbCon, string cityName)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT * FROM \"restaurants\" WHERE 'city' = {cityName}";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                yield return null;

            while (reader.Read())
            {
                var name = reader.GetString("name");
                var city = reader.GetString("city");
                var address = reader.GetString("address");
                var description = reader.GetString("description");
                var ownerId = reader.GetInt32("ownerId");
                var businessId = reader.GetInt32("businessId");
                var published = reader.GetBoolean("published");
                var phone = reader.GetString("phoneNumber");
                var workingTime = default(string);
                if (!reader.IsDBNull("workingTime"))
                    workingTime = reader.GetString("workingTime");
                var id = reader.GetGuid("id");

                yield return new Restaurant(businessId, name, city, address, description, ownerId, phone, workingTime, published, id);
            }
        }
    }
}