import { Router } from "express";
import PostsController from "../controller/posts-controller";


const postsRouter: Router = Router()

postsRouter.get('', (req, res) => { res.send("hello from posts router") })
postsRouter.post('/create', PostsController.create)
postsRouter.delete('/delete/:id', PostsController.delete)
postsRouter.get('/all', PostsController.getAll)
postsRouter.get('/one', PostsController.getOne)
postsRouter.get('/byUser/:id', PostsController.getUsers)
postsRouter.patch('/edit/:id', PostsController.edit)

export default postsRouter