import { Router } from "express";
import UserController from "../controller/user-controller";

const router: Router = Router();

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.users)

export default router
