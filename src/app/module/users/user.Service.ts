import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB = async (newUser: TUser) => {
    const result = await UserModel.create(newUser)
    return result
}

const getAllUsersFromDB = async () => {
    const result = await UserModel.find().select('username fullName age email address')
    return result

}

const getSingleUserFromDB = async (id: string) => {

    const result = await UserModel.findOne({ userId: id }).select('-_id')
    return result
}

export const UserService = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB
}