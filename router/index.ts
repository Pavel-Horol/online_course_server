import { Router } from "express";
import UserController from "../controller/user-controller";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware";

const router: Router = Router();

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

router.get('/users',
    authMiddleware,
    UserController.users
)

export default router
