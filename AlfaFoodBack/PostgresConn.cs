using System;
using Npgsql;

namespace AlfaFoodBack
{
    public static class PostgresConn
    {
        public static NpgsqlConnection GetConn()
        {
            bool boolfound = false;
            NpgsqlConnection conn =
                new NpgsqlConnection(
                    "Server=127.0.0.1; Port=5432; User Id=postgres; Password=root; Database=Alfafood"); //<ip> is an actual ip address
            conn.Open();
            return conn;
        }
    }
}