using System;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class UserRepository : IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var user = entity as User;
            if (UserWithLoginExists(dbCon, user.Email))
                throw new Exception("User exists");
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO public.\"Users\"(username, role, phone, password, email) VALUES ('{user.Username}', '{user.Role}', '{user.Phone}', '{user.Password}', '{user.Email}')";
            command.ExecuteNonQuery();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(NpgsqlConnection dbCon, int id)
        {
            throw new NotImplementedException();
        }

        public static User IsAuth(string login, string password, NpgsqlConnection dbCon)
        {
            var passHash = Encryptor.GetHashString(password);
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"select * from public.\"Users\" where email='{login}' and password='{passHash}'";
            var dataReader = command.ExecuteReader();
            if (!dataReader.HasRows)
                return null;
            dataReader.Read();
            var username = dataReader[0].ToString();
            var role = dataReader[1].ToString();
            var phone = dataReader[2].ToString();
            var id = int.Parse(dataReader[5].ToString());
            dataReader.Close();
            return new User(login, password, username, phone, role, id);
        }

        public bool UserWithLoginExists(NpgsqlConnection dbCon, string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT FROM public.\"Users\" Where email='{login}';";
            var result = command.ExecuteReader();
            return result.HasRows;
        }
    }
}