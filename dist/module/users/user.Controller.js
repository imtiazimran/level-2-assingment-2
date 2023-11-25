"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_Service_1 = require("./user.Service");
const user_validation_1 = require("./user.validation");
const user_model_1 = require("./user.model");
const handleErrorResponce = (res, status, message, error) => {
    const errorResponse = {
        success: false,
        message: message,
        error: {
            code: status,
            description: message,
        },
    };
    if (error && error.code && error.description) {
        errorResponse.error = Object.assign({}, error);
    }
    res.status(status).json(errorResponse);
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const validData = user_validation_1.UserValidationSchema.parse(newUser);
        const result = yield user_Service_1.UserService.createUserInDB(validData);
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
        });
    }
    catch (error) {
        handleErrorResponce(res, 500, "something went wrong while creating user", error);
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_Service_1.UserService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: `Users fetched successfully!`,
            data: result
        });
    }
    catch (error) {
        handleErrorResponce(res, 500, "coudn't get all users", error);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.getSingleUserFromDB(userId);
            res.status(200).json({
                success: true,
                message: `User fetched successfully!`,
                data: result
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        handleErrorResponce(res, 404, "User not found!", error);
    }
});
// update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.updateUserFromDB(updatedUserData, userId);
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
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        console.log(error);
        handleErrorResponce(res, 500, `${error}`, error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.deleteUserFromDB(userId);
            res.status(200).json({
                "success": true,
                "message": "User deleted successfully!",
                "data": null
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        handleErrorResponce(res, 404, "User not found!", error);
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const order = req.body;
    try {
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.addOrdersInDB(order, userId);
            res.status(200).json({
                "success": true,
                "message": "Order created successfully!",
                "data": null
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error);
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.getUserOrdersFromDB(userId);
            res.status(200).json({
                "success": true,
                "message": "Order fetched successfully!",
                "data": result
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error);
    }
});
const totalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        if (yield user_model_1.UserModel.isUserExist(userId)) {
            const result = yield user_Service_1.UserService.totalPrice(userId);
            res.status(200).json({
                "success": true,
                "message": "Total price calculated successfully!",
                "data": result
            });
        }
        else {
            handleErrorResponce(res, 404, "User not found", { code: 404, description: "User not found" });
        }
    }
    catch (error) {
        handleErrorResponce(res, 500, "Internal Server Erorr", error);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getUserOrders,
    totalPrice
};
