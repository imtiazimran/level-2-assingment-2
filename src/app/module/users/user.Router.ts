import express from 'express'
import { UserController } from './user.Controller'

const router = express.Router()
// create user
router.post("/", UserController.createUser)
// get all the users
router.get("/", UserController.getAllUsers)
// get single user
router.get("/:userId", UserController.getSingleUser)
// update a user
router.put("/:userId", UserController.updateUser)
// delete a user
router.delete("/:userId", UserController.deleteUser)
// create orders
router.put("/:userId/orders", UserController.addOrder)
// get orders
router.get("/:userId/orders", UserController.getUserOrders)
// get total price of a user orders
router.get("/:userId/orders/total-price", UserController.totalPrice)


export const UserRouter = router