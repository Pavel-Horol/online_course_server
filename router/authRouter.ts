import { Router } from "express";
import UserController from "../controller/user-controller";
import authMiddleware from "../middlewares/auth-middleware";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage: storage})
const authRouter: Router = Router();

authRouter.post('/registration', UserController.registration)
authRouter.post('/login', UserController.login)
authRouter.post('/logout', UserController.logout)
authRouter.get('/activate/:link', UserController.activate)
authRouter.get('/refresh', UserController.refresh)
authRouter.get('/profile', authMiddleware, UserController.profile)
authRouter.get('/getActivationLink', authMiddleware, UserController.getActivationLink)
authRouter.post('/uploadPhoto', 
    authMiddleware, 
    upload.single('file'),
    UserController.uploadPhoto)
export default authRouter
