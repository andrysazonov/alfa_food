import { instance } from "./api";

import { EstablishmentType } from "../redux/reducers/restaurantReducer";

export const restaurantAPI = {

    addRestaurant(data : any) {
        return instance.post(`/restaurant/add`, {...data}).then(res => res.data)
    },

    async addRestaurantImage(data : any) {
        const response = await fetch("/restaurant/image/add", {
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
        })
        return response;
    },


    getRestaurant(establishmentId: string) {
        return instance.get(`/restaurant/${establishmentId}`).then(res => res.data)
    }
}


