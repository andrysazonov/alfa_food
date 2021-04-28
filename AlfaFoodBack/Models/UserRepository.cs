using System;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class UserRepository: IRepository
    {
        public void Insert(MySqlConnection dbCon, IDbEntity entity)
        {
            var user = entity as User;
            if (UserWithLoginExists(dbCon, user.Login))
                throw new Exception("User exists");
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            if (user.Phone != null)
                command.CommandText =
                    $"INSERT INTO User (login, password, name, surname) VALUES({user.Login}, {user.Password}, {user.Username}, {user.Surname}, {user.Phone})";
            else
                command.CommandText =
                    $"INSERT INTO User (login, password, name, surname) VALUES({user.Login}, {user.Password}, {user.Username}, {user.Surname})";
            command.ExecuteNonQuery();

        }


        public HttpResponseMessage Update(MySqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public HttpResponseMessage GetById(MySqlConnection dbCon, int id)
        {
            throw new System.NotImplementedException();
        }

        public bool UserWithLoginExists(MySqlConnection dbCon, string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"select * from user where login={login}";
            return command.ExecuteNonQuery() > 0;
        }

    }
}