"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_Controller_1 = require("./user.Controller");
const router = express_1.default.Router();
// create user
router.post("/", user_Controller_1.UserController.createUser);
// get all the users
router.get("/", user_Controller_1.UserController.getAllUsers);
// get single user
router.get("/:userId", user_Controller_1.UserController.getSingleUser);
// update a user
router.put("/:userId", user_Controller_1.UserController.updateUser);
// delete a user
router.delete("/:userId", user_Controller_1.UserController.deleteUser);
// create orders
router.put("/:userId/orders", user_Controller_1.UserController.addOrder);
// get orders
router.get("/:userId/orders", user_Controller_1.UserController.getUserOrders);
// get total price of a user orders
router.get("/:userId/orders/total-price", user_Controller_1.UserController.totalPrice);
exports.UserRouter = router;
