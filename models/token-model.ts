import { model, Schema } from "mongoose";

export interface TokenDocument extends Document {
    refreshToken: string;
    user: Schema.Types.ObjectId;
}

const TokenSchema = new Schema<TokenDocument>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}

})

export default model<TokenDocument>("Token", TokenSchema)