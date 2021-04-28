using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public interface IRepository
    {
        public void Insert(MySqlConnection dbCon, IDbEntity entity);
        public HttpResponseMessage Update(MySqlConnection dbCon, IDbEntity entity);
        public HttpResponseMessage GetById(MySqlConnection dbCon, int id);
    }
}