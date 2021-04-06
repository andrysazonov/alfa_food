using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public interface IDbEntity
    {
        public IActionResult Insert(MySqlConnection dbCon);
        public IActionResult Update(MySqlConnection dbCon);
        public IDbEntity GetById(MySqlConnection dbCon, int id);
    }
}