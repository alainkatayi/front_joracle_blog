import { User } from "./user"

export interface Article {
    id:number,
    title:string,
    content:string
    slug:string
    user_id:User
    photo:string
    created_at:string
}