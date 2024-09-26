import { Router } from "express";
import UserController from "../controller/user-controller";
import {body} from 'express-validator'
const router: Router = Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max:8}),
    UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.users)

export default router
