import { Request, Response } from "express";
import { UserService } from "./user.Service";

const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body

        const result = await UserService.createUserInDB(newUser)
        res.status(200).json({
            success: true,
            message: 'User Created sucessfully',
            data: result
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                "code": 404,
                "description": "User not found!"
            }
        })
    }
}

export const UserController = {
    createUser,
}