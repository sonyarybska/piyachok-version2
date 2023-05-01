import {axiosInstance, IRes} from "./axios.service";
import {IPutUser, IUser} from "../interfaces/";

const usersService = {
    getAll: (): IRes<IUser[]> => axiosInstance.get(`/users`),
    getOne: (id: number | undefined):IRes<IUser>=>axiosInstance.get(`users/${id}`),
    putOne: (id: number | undefined, data: IPutUser)=>axiosInstance.put(`users/${id}`, data),
    deleteOne: (id: number | undefined)=>axiosInstance.delete(`users/${id}`)
}

export { usersService }