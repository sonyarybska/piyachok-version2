import {axiosInstance, IRes} from "./axios.service";
import {IResReview, IReview} from "../interfaces/";
import {GeneralQuery} from "../interfaces/";

const reviewsService = {
    getAllByEstId: (id: number, query: GeneralQuery) => axiosInstance.get(`/reviews/${id}`, {params:query}),
    getAllByUserId: (id: number, page:number|null, limit:number|null): IRes<IResReview> => axiosInstance.get(`/reviews/users/${id}`,{ params: {
            page,
            limit
        }}),
    getAvgRating: (id: number): IRes<{ avgRating:number }> => axiosInstance.get(`/reviews/${id}/rating`),
    postOne: (data: Partial<IReview>) => axiosInstance.post('/reviews', data).catch(err=>err.response),
    deleteOne: (id: number) => axiosInstance.delete(`/reviews/${id}`)
}

export {reviewsService}