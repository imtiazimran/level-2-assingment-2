import { Request, Response } from "express";
import { UserService } from "./user.Service";
import { UserValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body

        const validData = UserValidationSchema.parse(newUser)

        const result = await UserService.createUserInDB(validData)
        res.status(200).json({
            success: true,
            message: 'User Created sucessfully',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: {
                "code": 500,
                "description": "couldn't create user",
                error
            }
        })
    }
}

const getAllUsers =async (req:Request, res: Response) => {
    const result = await UserService.getAllUsersFromDB()
    res.status(200).json({
        success: true,
        message: `${result.length} Users Found`,
        data: result
    })
}

export const UserController = {
    createUser,
    getAllUsers
}