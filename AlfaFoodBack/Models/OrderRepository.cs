using System;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class OrderRepository: IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var order = entity as Order;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO \"public\".\"orders\"(id, userId, restaurantId, timeToGet, creationDateTime, tableId, isCompleted) " +
                $"VALUES" +
                $" ('{order.Id}',{order.UserId}, {order.RestaurantId}, '{order.TimeToGet}', {order.CreationDateTime}, {order.TableId}, {order.IsCompleted} )";
            command.ExecuteNonQuery();
            Console.WriteLine("insertOrder");
            foreach (var dishesId in order.DishesIds)
            {
                command.CommandType = CommandType.Text;
                command.CommandText =
                    $"INSERT INTO \"public\".\"orderswithdishes\"(orderId, dishId) " +
                    $"VALUES" +
                    $" ({order.Id}, {dishesId} )";
                command.ExecuteNonQuery();
            }
            Console.WriteLine("insertDishes");
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }
    }
}