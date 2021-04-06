using System;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class Order : IDbEntity
    {
        public IActionResult Insert(MySqlConnection dbCon)
        {
            throw new NotImplementedException();
        }

        public IActionResult Update(MySqlConnection dbCon)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(MySqlConnection dbCon, int id)
        {
            throw new NotImplementedException();
        }
    }
}