import { User } from './user';
export interface AuthLoginData {
    email:string
    password:string
}

export interface AuthLoginResponse {
    id:number
    name:string
    email:string
    email_verified:string
    token:string
    role:string
}