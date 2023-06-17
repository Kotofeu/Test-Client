import { $authHost, $host, baseUser } from "./index";
import jwt_decode from "jwt-decode";


const catchTokenError = (data: any): unknown => {
    if (data && data?.token) {
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
    return null
}

export const registration = async (email: string, password: string) => {
    const { data } = await $host.post(`${baseUser}registration`, { email, password })
    return catchTokenError(data)
}

export const login = async (email: string, password: string) => {
    
    const { data } = await $host.post(`${baseUser}login`, { email, password })
    return catchTokenError(data)

}
export const edit = async (params: any) => {
    const { data } = await $authHost.post(`${baseUser}edit`, params )
    return catchTokenError(data)

}
export const check = async () => {
    const { data } = await $authHost.get(`${baseUser}auth`)
    return catchTokenError(data)
}

export const createAdmin = async (email: string, password: string) => {
    const { data } = await $authHost.post(`${baseUser}create-admin`, { email, password })
    return data
}

export const getUserById = async (id: number) => {
    const { data } = await $host.get(`${baseUser}${id}`)
    return data
}