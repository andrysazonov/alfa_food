using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class User : IDbEntity
    {
        private int currentOrderId; // почему id заказа находится в классе юзер, на мой взгляд это неверно
        private int id;
        private readonly string login;
        private readonly string name;
        private Stack<Order> ordersHistory;
        private readonly string password;
        private readonly string phoneNumber;
        private readonly string surname;

        public User(string login, string password, string name, string surname, string phoneNumber = null)
        {
            if (!IsLoginValid(login))
                throw new Exception("Invalid login");
            if (!IsPasswordValid(password))
                throw new Exception("Invalid password");
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            this.login = login;
            this.password = password;
            this.name = name;
            this.surname = surname;
            this.phoneNumber = phoneNumber;
        }

        public IActionResult Insert(MySqlConnection dbCon)
        {
            if (UserWithLoginExists(dbCon, login))
                return new BadRequestResult();
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            if (phoneNumber != null)
                command.CommandText =
                    $"INSERT INTO User (login, password, name, surname) VALUES({login}, {password}, {name}, {surname}, {phoneNumber})";
            else
                command.CommandText =
                    $"INSERT INTO User (login, password, name, surname) VALUES({login}, {password}, {name}, {surname})";
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
            throw new NotImplementedException();
        }

        public bool UserWithLoginExists(MySqlConnection dbCon, string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"select * from user where login={login}";
            return command.ExecuteNonQuery() > 0;
        }

        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            return true;
        }

        private static bool IsLoginValid(string login)
        {
            return true;
        }

        private static bool IsPasswordValid(string password)
        {
            return password.Length >= 6;
        }
    }
}