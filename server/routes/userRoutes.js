import {Router} from 'express'
import { login, signUp } from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/register',signUp);
userRouter.post('/login',login)


export default userRouter;

