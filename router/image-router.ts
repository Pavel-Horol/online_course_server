import { Router } from "express";
import imageController from "../controller/image-controller";
import upload from "../setup/multer-setup";


const imageRouter:Router = Router()

imageRouter.post('/upload', 
    upload.single('image'),
    imageController.upload
)


export default imageRouter