import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
// create a user 
const createUserInDB = async (newUser: TUser) => {
    const result = await UserModel.create(newUser)
    return result
}

// get all the users 
const getAllUsersFromDB = async () => {
    const result = await UserModel.find().select('username fullName age email address')
    return result
}

// get single user from the database
const getSingleUserFromDB = async (id: string) => {
    const result = await UserModel.findOne({ userId: id }).select('-_id')
    return result
}

// update a user informatin
const updateUserFromDB = async (newUser: TUser, id: any) => {
    const result = await UserModel.findOneAndUpdate({ userId: id }, newUser, { new: true }).select('-_id')
    return result
}

export const UserService = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB
}