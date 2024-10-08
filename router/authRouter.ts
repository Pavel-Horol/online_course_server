import { Router } from "express";
import UserController from "../controller/user-controller";
import authMiddleware from "../middlewares/auth-middleware";

const authRouter: Router = Router();

authRouter.post('/registration', UserController.registration)
authRouter.post('/login', UserController.login)
authRouter.post('/logout', UserController.logout)
authRouter.get('/activate/:link', UserController.activate)
authRouter.get('/refresh', UserController.refresh)
authRouter.get('/users', authMiddleware, UserController.users)

export default authRouter