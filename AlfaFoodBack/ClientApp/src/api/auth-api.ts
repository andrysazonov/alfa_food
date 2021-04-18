import { instance } from "./api";



type CurrentUserDataType = {

}

type LoginResponseDataType = {

}

export const authAPI = {
    login(email: string, password: string, rememberMe?: boolean) {
        return instance.post(`auth/phys/login`, {email, password, rememberMe}).then(res => res.data)
    },

    logout() {
        return instance.delete(`auth/phys/login`)
    },

    currentUser() {
        return instance.get(`auth/phys/me`).then(res => res.data)
    }
}