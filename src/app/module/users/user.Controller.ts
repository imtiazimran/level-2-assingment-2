import { Request, Response } from "express";
import { UserService } from "./user.Service";
import { UserValidationSchema } from "./user.validation";
import { UserModel } from "./user.model";
import { TOrders, TUser } from "./user.interface";




const handleErrorResponce = (res: Response, status: number, message: string, error: any) => {
    const errorResponse = {
        success: false,
        message: message,
        error: {
            code: status,
            description: message,
        },
    };

    if (error && error.code && error.description) {
        errorResponse.error = { ...error };
    }

    res.status(status).json(errorResponse);
};


const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body

        const validData = UserValidationSchema.parse(newUser)

        const result = await UserService.createUserInDB(validData)
        res.status(200).json({
            success: true,
            message: 'User Created sucessfully',
            data: {
                userId: result.userId,
                username: result.username,
                fullName: {
                    firstName: result.fullName.firstName,
                    lastName: result.fullName.lastName,
                },
                age: result.age,
                email: result.email,
                isActive: result.isActive,
                hobbies: result.hobbies,
                address: {
                    street: result.address.street,
                    city: result.address.city,
                    country: result.address.country,
                }
            }
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

        handleErrorResponce(res, 500, "coudn't get all users", error)
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
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }

    } catch (error) {
        handleErrorResponce(res, 404, "User not found!", error)
    }


}

// update user
const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const updatedUserData = req.body
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.updateUserFromDB(updatedUserData, userId)
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: {
                    userId: updatedUserData.userId,
                    username: updatedUserData.username,
                    fullName: {
                        firstName: updatedUserData.fullName.firstName,
                        lastName: updatedUserData.fullName.lastName,
                    },
                    age: updatedUserData.age,
                    email: updatedUserData.email,
                    isActive: updatedUserData.isActive,
                    hobbies: updatedUserData.hobbies,
                    address: {
                        street: updatedUserData.address.street,
                        city: updatedUserData.address.city,
                        country: updatedUserData.address.country,
                    }
                }
            })
        } else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }
    } catch (error: any) {
        console.log(error);
        handleErrorResponce(res, 500, `${error}`, error)
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
                "data": null
            })
        } else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }

    } catch (error) {
        handleErrorResponce(res, 404, "User not found!", error)
    }
}


const addOrder = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    const order: TOrders = req.body
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.addOrdersInDB(order, userId)
            res.status(200).json({
                "success": true,
                "message": "Order created successfully!",
                "data": null
            })
        } else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }
    } catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error)
    }
}


const getUserOrders = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.getUserOrdersFromDB(userId)
            res.status(200).json({
                "success": true,
                "message": "Order fetched successfully!",
                "data": result
            })
        } else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }
    } catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error)
    }
}

const totalPrice = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    try {
        if (await UserModel.isUserExist(userId as unknown as number)) {
            const result = await UserService.totalPrice(userId)
            res.status(200).json({
                "success": true,
                "message": "Total price calculated successfully!",
                "data": result
            })
        } else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" })
        }
    } catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error)
    }
}

export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getUserOrders,
    totalPrice
}