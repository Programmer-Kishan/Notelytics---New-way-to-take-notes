import mongoose, {Document, InferSchemaType, Schema, model} from "mongoose";

export interface INote extends Document { 
    notebookId: mongoose.Types.ObjectId,
    title: string,
    description: string,
}

const noteSchema = new Schema({
    notebookId: {type: mongoose.Types.ObjectId},
    title: {type: String},
    description: {type: String},
    uploads: [{type: mongoose.Types.ObjectId, ref: "Upload"}],
})

type Note = InferSchemaType<typeof noteSchema>

export default model<Note>("Note", noteSchema);