import {instance} from "./api";

export const applicationAPI = {
    confirmApplication(data: any) {
        return instance.post(`/Restaurant/confirm`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => res.data)
    },
}