import {Document, InferSchemaType, Schema, model} from "mongoose";

export interface IUpload extends Document { 
    title: string,
    description: string,
    filename: string,
    type: 'Pdf' | 'Image' | 'Video'
}

const uploadSchema = new Schema({
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    type: {type: String}
})

type Upload = InferSchemaType<typeof uploadSchema>

export default model<Upload>("Upload", uploadSchema);