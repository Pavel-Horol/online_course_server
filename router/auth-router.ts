import { Router } from "express";
import UserController from "../controller/user-controller";
import authMiddleware from "../middlewares/auth-middleware";
import upload from "../setup/upload-setup";

const authRouter: Router = Router();

authRouter.post('/registration', UserController.registration)
authRouter.post('/login', UserController.login)
authRouter.post('/logout', UserController.logout)
authRouter.get('/activate/:link', UserController.activate)
authRouter.get('/refresh', UserController.refresh)
authRouter.get('/profile', authMiddleware, UserController.profile)
authRouter.get('/getActivationLink', authMiddleware, UserController.getActivationLink)
export default authRouter
