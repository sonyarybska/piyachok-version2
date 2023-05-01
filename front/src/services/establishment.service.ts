import {axiosInstance, IRes} from "./axios.service";
import {IEstablishment, IPatchEst, ITypeEst} from "../interfaces/";


const establishmentService = {
    getAll: (params:any):IRes<{establishments:IEstablishment[],count:number,maxCheck:number}> => axiosInstance.get(`/establishments`,{params}),
    getAllByUserId:(params:any,id:number)=>axiosInstance.get(`/establishments/users/${id}`, {params}),
    getOne:(id:number):IRes<IEstablishment> => axiosInstance.get(`/establishments/${id}`),
    getType:():IRes<ITypeEst[]> => axiosInstance.get(`/establishments/type/est`),
    postOne: async (file: FormData)=>{
      const response = await axiosInstance.post('/establishments',file, { headers: {'Content-Type': 'multipart/form-data'}})
          .catch(e => e);
        return response.data.constraints? alert(Object.values(response.data.constraints).map(value => value)): response;
    } ,
    patchOne:async (id:number, data:IPatchEst)=>axiosInstance.patch(`/establishments/${id}`, data),
    putOne:async (id: number, data: FormData)=>{
        const response = await  axiosInstance.put(`/establishments/${id}`, data).catch(e=>e);
        return response.data.constraints? alert(Object.values(response.data.constraints).map(value => value)): response;
    },
    deleteOne:(id:number)=>axiosInstance.delete(`/establishments/${id}`)
}

export {establishmentService}