import mongoose, { Schema } from "mongoose";
import { IUserModel, TAddress, TUser, TUserName } from "./user.interface";
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

const userSchema = new Schema<TUser, IUserModel>({
    userId: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: nameSchema,
    age: {type: Number, required: true},
    email: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    hobbies: [String],
    address: addressShema
})

// for new document posting
userSchema.pre("save", async function(next) {
    const currentUser = this
    currentUser.password = await bcrypt.hash(currentUser.password, Number(config.brypt_salt_round))
    next()
})

// for updating data
userSchema.pre("findOneAndUpdate", async function(next) {
    const currentDocumet : any = this.getUpdate()
    // console.log(currentDocumet._update);
    currentDocumet._update.password = await bcrypt.hash(currentDocumet._update.password, Number(config.brypt_salt_round))
    next()
})

userSchema.methods.toJSON = function(){
    const currentUser = this.toObject();
    delete currentUser.password;
    return currentUser
}

userSchema.statics.isUserExist =async (id:number) => {
    const user = await UserModel.findOne({userId: id})
    return user
}


export const UserModel = mongoose.model<TUser, IUserModel>("user", userSchema)


