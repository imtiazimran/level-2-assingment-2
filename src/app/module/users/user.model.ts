import mongoose, { Schema } from "mongoose";
import { IUserModel, TAddress, TOrders, TUser, TUserName } from "./user.interface";
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

const orderSchema = new Schema<TOrders>({
    productName: String,
    price: Number,
    quantity: Number
})

const userSchema = new Schema<TUser, IUserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: nameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: [String],
    address: addressShema,
    orders: [orderSchema],
    isDeleted: { type: Boolean, default: false }
})

// for new document posting
userSchema.pre("save", async function (next) {
    const currentUser = this
    currentUser.password = await bcrypt.hash(currentUser.password, Number(config.brypt_salt_round))
    next()
})

// for updating data
userSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const update = this.getUpdate();
        const { password, ...rest } = update; // Destructure password and other fields
        const hashedPassword = password ? await bcrypt.hash(password, Number(config.brypt_salt_round)) : undefined;
        
        if (hashedPassword) {
            // Update the 'password' field in the update object with the hashed password
            this.setUpdate({ ...rest, password: hashedPassword });
        }
    } catch (error) {
        console.error(error);
    }
    next();
});







// don't show the deleted data 
userSchema.pre(/^find/, function (next) {
    const currentDocumet: any = this
    currentDocumet.find({ isDeleted: { $ne: true } })
    next()
});

// don't send password field on the response
userSchema.methods.toJSON = function () {
    const currentUser = this.toObject();
    delete currentUser.password;
    return currentUser
}

userSchema.statics.isUserExist = async (id: number) => {
    const user = await UserModel.findOne({ userId: id })
    return user
}


export const UserModel = mongoose.model<TUser, IUserModel>("user", userSchema)


