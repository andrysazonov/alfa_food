using System;
using System.Collections.Generic;


namespace AlfaFoodBack.Models
{
    public class Restaurant : IDbEntity
    {
        public int Id;
        public readonly string Name;
        public readonly string PhoneNumber;
        public readonly string City;
        public readonly string Address; //Надо определиться с форматом хранения адреса, а так же организовать проверку на валидность адреса
        public readonly string Description; //надо добавить возможность изменять описание ресторана и возможность не добавлять его при регистрации
        public readonly int OwnerId; 
        //private List<int> Workers; // id людей, работающих в ресторане, имеющих свои задачи в приложении (прим. официант, хостес)
        public readonly string WorkingTime; //время работы, добавляется уже после создания в настройках ресторана. 
            
        public Restaurant(int id, string name, string city, string address, string description, int ownerId, string phoneNumber = null, string workingTime = null)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            if (!IsAddressValid(address))
                throw new Exception("Invalid address");

            Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
            City = city;
            Address = address;
            Description = description;
            OwnerId = ownerId;
            WorkingTime = workingTime==null?"8:00,23:00": workingTime;
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