import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true},
    content: {type: String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model('Post',PostSchema)