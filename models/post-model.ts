import { model, Schema } from "mongoose";

interface PostDocument extends Document {
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    createdAt: Date
}

const PostSchema = new Schema<PostDocument>({
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

export default model<PostDocument>('Post',PostSchema)