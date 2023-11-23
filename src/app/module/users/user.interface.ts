import { Model } from "mongoose"

export type TUserName = {
    firstName: string,
    lastName: string
}

export type TAddress ={
    street: string,
    city: string,
    country: string   
}

export type TUser = {
    userId: number,
    username: string,
    password: string,
    fullName: TUserName,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: TAddress,
}

export interface IUserModel extends Model<TUser> {
    isUserExist(id: number): Promise<TUser | null>
  }