import { instance } from "./api";

import { EstablishmentType } from "../redux/reducers/restaurantReducer";

export const restaurantAPI = {
    
    // addRestaurant(name: string, address: string, phone: string, businessId: string) {
    //     return instance.post(`/restaurant/add`, {name, address, phone, businessId}).then(res => res.data)
    // }
    addRestaurant(data : any) {
        return instance.post(`/restaurant/add`, {data}).then(res => res.data)
    },

    getRestaurant(establishmentId: string) {
        return instance.get(`/restaurant/${establishmentId}`).then(res => res.data)
    }
}