import { Request, Response } from "express";
import { UserService } from "./user.Service";
import { UserValidationSchema } from "./user.validation";
import { UserModel } from "./user.model";
import { TOrders } from "./user.interface";




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
        const userId = Number(req.params.userId)
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
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
        const result = await UserService.updateUserFromDB(newUser, userId)
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
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
        handleErrorResponce(res, 404, "Error occured while updating user!", error)
    }
    
}



const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.deleteUserFromDB(userId)
            res.status(200).json({
                "success": true,
                "message": "User deleted successfully!",
                "data" : null
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


const addOrder =async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    const order : TOrders = req.body
        try {
            if (await UserModel.isUserExist(userId as unknown as number)) {
                const result = await UserService.addOrdersInDB(order, userId )
                res.status(200).json({
                    "success": true,
                    "message": "Order created successfully!",
                    "data": null
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



export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder
}