using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public interface IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity);
        public HttpResponseMessage Update(NpgsqlConnection dbCon, IDbEntity entity);
        public HttpResponseMessage GetById(NpgsqlConnection dbCon, int id);
    }
}