using System;
using System.Collections.Generic;

namespace AlfaFoodBack.Models
{
    public class Restaurant : IDbEntity
    {
        public readonly string
            Address; //Надо определиться с форматом хранения адреса, а так же организовать проверку на валидность адреса

        public readonly string
            Description; //надо добавить возможность изменять описание ресторана и возможность не добавлять его при регистрации

        public readonly string Name;
        public readonly string PhoneNumber;
        public int CurrentOrderId;
        public int? Id;

        private List<int>
            moderators; //список людей, имеющих право изменять данные о ресторане через приложения (прим. владелец и менеджер ресторана)

        public int OwnerId;

        private List<int>
            workers; // id людей, работающих в ресторане, имеющих свои задачи в приложении (прим. официант, хостес)

        public Restaurant(int ownerId, string name, string address, string description, string phoneNumber = null,
            int? id = null)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            if (!IsAddressValid(phoneNumber))
                throw new Exception("Invalid address");
            OwnerId = ownerId;
            Name = name;
            PhoneNumber = phoneNumber;
            Address = address;
            Description = description;
            moderators = new List<int> {ownerId};
            workers = new List<int>();
            Id = id;
        }


        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            return true;
        }

        private static bool IsAddressValid(string phoneNumber)
        {
            return true;
        }
    }
}