import { Router } from "express";
import userController from "../controllers/user.controller";
import passport, { session } from "passport";
const userRouter = Router()

userRouter.post('/api/v1/signup', userController.signUp)
userRouter.post('/api/v1/signin', userController.signIn)
userRouter.get('/api/v1/allUsers',passport.authenticate('jwt', {session: false} ) ,userController.getAll)
userRouter.get('/api/v1/generalusers', userController.getAll)
export default userRouter