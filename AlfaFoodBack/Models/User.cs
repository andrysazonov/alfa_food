using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class User:IDbEntity
    {
        public int CurrentOrderId { get; }
        public readonly int Id;
        public readonly string Login;
        public readonly string Username;
        // public Stack<Order> OrdersHistory;
        public readonly string Password;
        public readonly string Phone;
        public readonly string Surname;

        public User(string login, string password, string username, string surname, string phone = null)
        {
            if (!IsLoginValid(login))
                throw new Exception("Invalid login");
            if (!IsPasswordValid(password))
                throw new Exception("Invalid password");
            if (!IsPhoneNumberValid(phone))
                throw new Exception("Invalid phone number");
            this.Login = login;
            this.Password = password;
            this.Username = username;
            this.Surname = surname;
            this.Phone = phone;
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