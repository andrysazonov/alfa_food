using System;
using System.Collections.Generic;
using System.IO;

namespace AlfaFoodBack.Models
{
    public class Restaurant : IDbEntity
    {
        public readonly Guid Id;
        public readonly int BusinessId;
        public readonly string Name;
        public readonly string PhoneNumber;
        public readonly string City;
        public readonly string Address; //Надо определиться с форматом хранения адреса, а так же организовать проверку на валидность адреса
        public readonly string Description; //надо добавить возможность изменять описание ресторана и возможность не добавлять его при регистрации
        public readonly int OwnerId; 
        //private List<int> Workers; // id людей, работающих в ресторане, имеющих свои задачи в приложении (прим. официант, хостес)
        public readonly string WorkingTime; 
        public bool Published;
        public readonly byte[] ImageMap;

        public Restaurant(int businessId, string name, string city, string address, // первое создание без id и картинки
                            string description, int ownerId, string phoneNumber, 
                            string workingTime, bool published)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            if (!IsAddressValid(address))
                throw new Exception("Invalid address");

            Id = Guid.NewGuid();
            BusinessId = businessId;
            Name = name;
            PhoneNumber = phoneNumber;
            City = city;
            Address = address;
            Description = description;
            OwnerId = ownerId;
            WorkingTime = workingTime;
            ImageMap = null;
        }

        public Restaurant(int businessId, string name, string city, string address,
                            string description, int ownerId, string phoneNumber,
                            string workingTime, bool published, Guid id, byte[] imageMap = null)
        {
            if (!IsPhoneNumberValid(phoneNumber))
                throw new Exception("Invalid phone number");
            if (!IsAddressValid(address))
                throw new Exception("Invalid address");

            Id = id;
            BusinessId = businessId;
            Name = name;
            PhoneNumber = phoneNumber;
            City = city;
            Address = address;
            Description = description;
            OwnerId = ownerId;
            WorkingTime = workingTime;
            ImageMap = imageMap;
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