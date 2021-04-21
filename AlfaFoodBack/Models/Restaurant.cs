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
        private readonly string login;
        private readonly string name;
        private Stack<Order> ordersHistory;
        private readonly string password;
        private readonly string phoneNumber;

        public Restaurant(string login, string password, string name, string phoneNumber = null)
        {
            if (!IsLoginValid(login)) // Нужно вынести проверку логина, пароля и номера для ресторана и юзера в однельный класс чекер
                throw new Exception("Invalid login");
            if (!IsPasswordValid(password))
                throw new Exception("Invalid password");
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            this.login = login;
            this.password = password;
            this.name = name;
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
                    $"INSERT INTO User (login, password, name, surname) VALUES({login}, {password}, {name}, {phoneNumber})";
            else
                command.CommandText =
                    $"INSERT INTO User (login, password, name, surname) VALUES({login}, {password}, {name})";
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