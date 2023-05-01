import {IUser} from "./user.inrerface";

interface IEstablishment {
    establishment_id: number,
    title: string,
    type: string,
    tags: string|Array<string>,
    start_work: string,
    end_work: string,
    location: string,
    average_check: number,
    phone: string,
    approved: boolean,
    pending: boolean,
    rejected: boolean,
    photos: string[],
    avatar: string,
    created_at: string,
    updated_at: string,
    user?: IUser,
}

interface IPatchEst {
    approved: boolean,
    pending: boolean,
    rejected: boolean
}

interface ITypeEst {
    type_id: number,
    title: string
}

interface EstablishmentPayload {
    establishments:IEstablishment[],
    count: number;
    maxCheck?:number;
}

export type {
    IEstablishment, IPatchEst, ITypeEst,EstablishmentPayload
}

