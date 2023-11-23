import { Request, Response } from "express";
import { UserService } from "./user.Service";
import { UserValidationSchema } from "./user.validation";
import { UserModel } from "./user.model";




const handleErrorResponce = (res: Response, status: number, message: string, error: any) => {
    res.status(status).json({
        success: false,
        message: message,
        error: {
            "code": status,
            "description": message,
            error
        }
    })
}

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
        handleErrorResponce(res, 500, "something went wrong while creating user", error)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: `Users fetched successfully!`,
            data: result
        })
    } catch (error) {

        handleErrorResponce(res, 404, "coudn't get all users", error)
    }

}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.getSingleUserFromDB(userId)
            res.status(200).json({
                success: true,
                message: `User fetched successfully!`,
                data: result
            })
        } else {
            res.status(404).json({
                "success": false,
                "message": "User not found",
                "error": {
                    "code": 404,
                    "description": "User not found!"
                }
            })
        }

    } catch (error) {
        handleErrorResponce(res, 404, "User not found!", error)
    }


}

// update user
const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const newUser = req.body
    if (await UserModel.isUserExist(userId as unknown as number)) {
        const result = await UserService.updateUserFromDB(newUser, userId)
        res.status(200).json({
            success: true,
            message:  "User updated successfully!",
            data: result
        })
    } else {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        })
    }
}



export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser
}