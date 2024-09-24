import mongoose, {Document, InferSchemaType, Schema, model} from "mongoose";

export interface INoteBook extends Document {
    userId: mongoose.Types.ObjectId,
    title: string,
    description: string,
    notes: mongoose.Types.ObjectId[],
    notesName: string[]
}

const notebookSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId},
    title: {type: String},
    description: {type: String},
    notes: [{type: mongoose.Types.ObjectId}],
    notesName: [{type: String}],
})

type Notebook = InferSchemaType<typeof notebookSchema>

export default model<Notebook>("Notebook", notebookSchema);