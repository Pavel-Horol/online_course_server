import { Router } from "express";
import authRouter from "./auth-router";
import postsRouter from "./posts-router";
import authMiddleware from "../middlewares/auth-middleware";
import imageRouter from "./image-router";

const router: Router = Router();

router.use('/auth', authRouter)
router.use('/posts', authMiddleware, postsRouter)
router.use('/image', imageRouter)

export default router
