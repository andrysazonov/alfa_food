using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class Restaurant : IDbEntity
    {
        private int currentOrderId;
        private int id;
        private int ownerId; 
        private readonly string name;
        private Stack<Order> ordersHistory;
        private readonly string phoneNumber;
        private readonly string address; //Надо определиться с форматом хранения адреса, а так же организовать проверку на валидность адреса
        private readonly string description; //надо добавить возможность изменять описание ресторана и возможность не добавлять его при регистрации
        private List<int> moderators; //список людей, имеющих право изменять данные о ресторане через приложения (прим. владелец и менеджер ресторана)
        private List<int> workers; // id людей, работающих в ресторане, имеющих свои задачи в приложении (прим. официант, хостес)

        public Restaurant(int ownerId, string name, string address, string description, string phoneNumber = null)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number"); 
            if (!IsAddressValid(phoneNumber))
                throw new Exception("Invalid address");
            this.ownerId = ownerId;
            this.name = name;
            this.phoneNumber = phoneNumber;
            this.address = address;
            this.description = description;
            moderators = new List<int> { ownerId };
            workers = new List<int>();

        }

        public IActionResult Insert(MySqlConnection dbCon)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            if (phoneNumber != null)
                command.CommandText =
                    $"INSERT INTO Restaurant (ownerId, name, phoneNumber, address, description) VALUES({ownerId}, {name}, {phoneNumber}, {address}, {description})";
            else
                command.CommandText =
                    $"INSERT INTO Restaurant (ownerId, name, address, description) VALUES({ownerId}, {name}, {address}, {description})";
            try
            {
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }

            return new OkResult();
        }

        public IActionResult Update(MySqlConnection dbCon)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(MySqlConnection dbCon, int id)
        {

            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT name, phoneNumber, address, description" +
                                    $"FROM Restaurant" +
                                    $"WHERE id = {id}";

            try
            {
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        throw new NotImplementedException();
                    }
                }
                else
                {
                    throw new Exception("No rows found.");
                }
                reader.Close();
            }
            catch (Exception e)
            {
                throw new NotImplementedException();
            }

            throw new NotImplementedException();
        }

        public IDbEntity GetRestaurantsByOwnerId(MySqlConnection dbCon, int id)
        {

            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT name, phoneNumber, address, description" +
                                    $"FROM Restaurant" +
                                    $"WHERE ownerId = {id}";

            try
            {
                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        throw new NotImplementedException();
                    }
                }
                else
                {
                    throw new Exception("No rows found.");
                }
                reader.Close();
            }
            catch (Exception e)
            {
                throw new NotImplementedException();
            }

            throw new NotImplementedException();
        }

        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            throw new NotImplementedException();
        }

        private static bool IsAddressValid(string phoneNumber)
        {
            throw new NotImplementedException();
        }
    }
}