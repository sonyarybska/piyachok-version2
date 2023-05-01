export interface IUser {
    user_id: number,
    name:string,
    email:string,
    picture:string,
    admin:boolean,
    createdAt:string,
    updatedAt:string
}

export interface IPutUser{
    user_id?: number,
    name?:string,
    email?:string,
    picture?:string,
    admin?:boolean,
}

export interface ITokens{
    access_token:string,
    refresh_token:string
}

export interface IUserAndTokens{
    user:IUser,
    tokens:ITokens
}

export interface IClientId{
    clientId:string|undefined
}