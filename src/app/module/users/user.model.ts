import mongoose, { Schema } from "mongoose";
import { TAddress, TUser, TUserName } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

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

userSchema.pre("save", async function(next) {
    const currentUser = this
    currentUser.password = await bcrypt.hash(currentUser.password, Number(config.brypt_salt_round))
    next()
})

userSchema.methods.toJSON = function(){
    const currentUser = this.toObject();
    delete currentUser.password;
    return currentUser
}


export const UserModel = mongoose.model("user", userSchema)


