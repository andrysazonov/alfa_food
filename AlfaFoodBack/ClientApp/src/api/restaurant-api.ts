import { instance } from "./api";



type CurrentUserDataType = {

}

type LoginResponseDataType = {

}

export const restaurantAPI = {
    
    addRestaurant(name: string, address: string, phone: string, description: string) {
        return instance.post(`/restaurant/add`, {name, address, phone, description}).then(res => res.data)
    }
}