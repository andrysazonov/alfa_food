using System;
using System.Collections.Generic;


namespace AlfaFoodBack.Models
{
    public class Restaurant : IDbEntity
    {
        public string Id;
        public readonly string Name;
        public readonly string PhoneNumber;
        public readonly string Address; //Надо определиться с форматом хранения адреса, а так же организовать проверку на валидность адреса
        public readonly string Description; //надо добавить возможность изменять описание ресторана и возможность не добавлять его при регистрации
        private List<int> Owners; //список людей, имеющих право изменять данные о ресторане через приложения (прим. владелец и менеджер ресторана)
        private List<int> Workers; // id людей, работающих в ресторане, имеющих свои задачи в приложении (прим. официант, хостес)
        private ((int hour, int minute) start, (int hour, int minute) end) WorkingTime; //время работы, добавляется уже после создания в настройках ресторана. 
            
        public Restaurant(string name, string address, string description, int ownerId, string phoneNumber = null, string id = null)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            if (!IsAddressValid(address))
                throw new Exception("Invalid address");
            Name = name;
            PhoneNumber = phoneNumber;
            Address = address;
            Description = description;
            Owners = new List<int> {ownerId};
            Workers = new List<int>();
            WorkingTime = ((8,0),(11,0));
            Id = id;
        }


        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            return true;
        }

        private static bool IsAddressValid(string address)
        {
            return true;
        }
    }
}