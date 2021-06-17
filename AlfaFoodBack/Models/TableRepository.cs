using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class TableRepository:IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var table = entity as Table;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                @$"INSERT INTO public.tables(name, ""tableId"", ""isFree"", ""restaurantId"")
            VALUES ('{table.Name}', '{table.TableId}', {table.IsFree}, '{table.RestaurantId}');";
            command.ExecuteNonQuery();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }
    }
}