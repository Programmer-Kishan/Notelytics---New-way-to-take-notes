import mongoose, { Schema, Document, InferSchemaType, model } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    notebooks?: mongoose.Types.ObjectId[],
    notebookNames?: string[],
}

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true, select: false},
    notebooks: [{type: Schema.Types.ObjectId}],
    notebookNames: [{type: String}]
}, {timestamps: true});

type User = InferSchemaType<typeof userSchema>

export default model<User>("User", userSchema);