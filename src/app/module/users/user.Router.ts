import express from 'express'
import { UserController } from './user.Controller'

const router = express.Router()

router.post("/", UserController.createUser)
router.get("/", UserController.getAllUsers)

export const UserRouter = router