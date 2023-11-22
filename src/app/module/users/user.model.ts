import mongoose, { Schema } from "mongoose";
import { TAddress, TUser, TUserName } from "./user.interface";


const nameSchema = new Schema<TUserName>({
    firstName: String,
    lastName: String
})

const addressShema = new Schema<TAddress>({
    street: String,
    city: String,
    country: String
})

const userSchema = new Schema<TUser>({
    userId: {type: Number, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    fullName: nameSchema,
    age: {type: Number, required: true},
    email: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    hobbies: [String],
    address: addressShema
})


export const UserModel = mongoose.model("user", userSchema)


