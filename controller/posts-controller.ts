import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";
import postModel from "../models/post-model";

class PostsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            
            const user = req.user 
            const {title, content} = req.body
            
            if(!user) { return next(ApiError.UnauthorizedError())}
            if(!title || !content) { return next(ApiError.BadRequest('Title and content are required.'))}
        
            const newPost = await postModel.create({
                title,
                content,
                author: user.id
            })
            return res.status(201).json(newPost)

        } catch (error) {
           return next(error) 
        }
   } 

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user 
            const {id} = req.params
            const postToDelete = await postModel.findById(id) 

            if(!user) { return next(ApiError.UnauthorizedError())}
            if(!id) {return next(ApiError.BadRequest('Post id not provided'))}
            if(!postToDelete) { return next(ApiError.BadRequest('Post not found'))}
            if(postToDelete.author.toString() !== user.id){return next(ApiError.ForbiddenError())}
            
            await postModel.findByIdAndDelete(id)
            res.status(200).json({message: 'Post deleted successfully.'})

        } catch (error) {
           return next(error) 
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postModel.find()            
            res.status(200).json(posts)
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user 
            if(!user) { return next(ApiError.UnauthorizedError())}
            
            const userPosts = await postModel.find({author: user.id})
            return res.status(200).json(userPosts)

        } catch (error) {
            next(error)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user 
            const {id} = req.params
            const post = await postModel.findById(id) 

            if(!user) { return next(ApiError.UnauthorizedError())}
            if(!id) {return next(ApiError.BadRequest('Post id not provided'))}
            if(!post) { return next(ApiError.BadRequest('Post not found'))}

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    async edit(req: Request, res: Response, next: NextFunction){
        try {
            const {title, content } = req.body
            const user = req.user 
            const {id} = req.params

            if(!user) { return next(ApiError.UnauthorizedError())}
            if(!id) {return next(ApiError.BadRequest('Post id not provided'))}
            if(!content && !title) {return next(ApiError.BadRequest('No data provided')) }

            const post = await postModel.findById(id)
            if(!post){ return next(ApiError.BadRequest('Post not found'))}
            if (post.author.toString() !== user.id) { return next(ApiError.ForbiddenError()); }

            if(title) post.title = title
            if(content) post.content = content
            
            const updatedPost = await post.save()
            return res.status(200).json(updatedPost)
        } catch (error) {
            next(error)
        }
    }
}

export default new PostsController () 