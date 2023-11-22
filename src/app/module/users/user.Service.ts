import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB =async (newUser:TUser) => {
    const result = await UserModel.create(newUser)
    return result
}

export const UserService = {
    createUserInDB,
}