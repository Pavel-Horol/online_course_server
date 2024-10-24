"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../exceptions/api-error");
const post_model_1 = __importDefault(require("../models/post-model"));
class PostsController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { title, content } = req.body;
                if (!user) {
                    return next(api_error_1.ApiError.UnauthorizedError());
                }
                if (!title || !content) {
                    return next(api_error_1.ApiError.BadRequest('Title and content are required.'));
                }
                const newPost = yield post_model_1.default.create({
                    title,
                    content,
                    author: user.id
                });
                return res.status(201).json(newPost);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const postToDelete = yield post_model_1.default.findById(id);
                if (!user) {
                    return next(api_error_1.ApiError.UnauthorizedError());
                }
                if (!id) {
                    return next(api_error_1.ApiError.BadRequest('Post id not provided'));
                }
                if (!postToDelete) {
                    return next(api_error_1.ApiError.BadRequest('Post not found'));
                }
                if (postToDelete.author.toString() !== user.id) {
                    return next(api_error_1.ApiError.ForbiddenError());
                }
                yield post_model_1.default.findByIdAndDelete(id);
                res.status(200).json({ message: 'Post deleted successfully.' });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_model_1.default.find();
                res.status(200).json(posts);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    return next(api_error_1.ApiError.UnauthorizedError());
                }
                const userPosts = yield post_model_1.default.find({ author: user.id });
                return res.status(200).json(userPosts);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const post = yield post_model_1.default.findById(id);
                if (!user) {
                    return next(api_error_1.ApiError.UnauthorizedError());
                }
                if (!id) {
                    return next(api_error_1.ApiError.BadRequest('Post id not provided'));
                }
                if (!post) {
                    return next(api_error_1.ApiError.BadRequest('Post not found'));
                }
                res.status(200).json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                const user = req.user;
                const { id } = req.params;
                if (!user) {
                    return next(api_error_1.ApiError.UnauthorizedError());
                }
                if (!id) {
                    return next(api_error_1.ApiError.BadRequest('Post id not provided'));
                }
                if (!content && !title) {
                    return next(api_error_1.ApiError.BadRequest('No data provided'));
                }
                const post = yield post_model_1.default.findById(id);
                if (!post) {
                    return next(api_error_1.ApiError.BadRequest('Post not found'));
                }
                if (post.author.toString() !== user.id) {
                    return next(api_error_1.ApiError.ForbiddenError());
                }
                if (title)
                    post.title = title;
                if (content)
                    post.content = content;
                const updatedPost = yield post.save();
                return res.status(200).json(updatedPost);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new PostsController();
