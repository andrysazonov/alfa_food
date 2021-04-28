using System;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class UserRepository: IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var user = entity as User;
            if (UserWithLoginExists(dbCon, user.Email))
                throw new Exception("User exists");
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            Console.WriteLine();
            command.CommandText =
                    $"INSERT INTO public.\"Users\"(username, role, phone, password, email) VALUES ('{user.Username}', '{user.Role}', '{user.Phone}', '{user.Password}', '{user.Email}')";
            Console.WriteLine(command.CommandText);
            command.ExecuteNonQuery();
        }


        public HttpResponseMessage Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetById(NpgsqlConnection dbCon, int id)
        {
            throw new System.NotImplementedException();
        }

        public bool UserWithLoginExists(NpgsqlConnection dbCon, string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"select * from public.\"Users\" where email='{login}'";
            return command.ExecuteNonQuery() > 0;
        }

    }
}