import {axiosInstance, IRes} from "./axios.service";
import {IFavorite, IFavoriteResponse} from "../interfaces/";


const favoriteService = {
    fetchFavorite: ():IRes<IFavorite[]> => axiosInstance.get(`/favorites`),
    fetchFavoriteByUserId: (id:number, page:number|null,limit:number|null):IRes<IFavoriteResponse> => axiosInstance.get(`/favorites/${id}`,{params:{page,limit}}),
    addUsersFavorite:(user_id:number, establishment_id:number):IRes<IFavorite> => axiosInstance.post(`/favorites`,{user_id,establishment_id}),
    deleteFavorite: (id: number, establishment_id:number)=> axiosInstance.delete(`/favorites/${id}/${establishment_id}`)
}

export {favoriteService}