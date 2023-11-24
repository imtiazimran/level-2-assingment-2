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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
// create a user 
const createUserInDB = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(newUser);
    return result;
});
// get all the users 
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find().select('username fullName age email address -_id');
    return result;
});
// get single user from the database
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: id }).select('-_id -orders -isDeleted -__v');
    return result;
});
// update a user informatin
const updateUserFromDB = (newUser, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: id }, newUser).select('-_id');
    return result;
});
// delete a user from database 
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId: id }, { isDeleted: true });
    return result;
});
// add or create orders for user 
const addOrdersInDB = (order, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId: id });
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.orders || !Array.isArray(user.orders)) {
        user.orders = [order];
    }
    else {
        user.orders.push(order);
    }
    const result = yield user.save();
    return result;
});
// get orders by user 
const getUserOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId: id });
    return user === null || user === void 0 ? void 0 : user.orders;
});
// canculate total price of all the products of a user
const totalPrice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId: id } },
        { $unwind: "$orders" },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1
            }
        }
    ]);
    return result[0];
});
exports.UserService = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,
    addOrdersInDB,
    getUserOrdersFromDB,
    totalPrice
};
