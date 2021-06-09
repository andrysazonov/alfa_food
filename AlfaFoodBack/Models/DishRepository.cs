using Npgsql;

namespace AlfaFoodBack.Models
{
    public class DishRepository:IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }
    }
}