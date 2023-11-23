import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB =async (newUser:TUser) => {
    const result = await UserModel.create(newUser)
    return result
}

const getAllUsersFromDB =async () => {
    const result = await UserModel.find().select('username fullName age email address')
    return result

}

export const UserService = {
    createUserInDB,
    getAllUsersFromDB
}