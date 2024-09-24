import { RequestHandler } from "express";
import createHttpError from "http-errors";

import NoteModel from '../models/note';
import UploadModel from "../models/upload";

interface uploadBody {
    noteId: string,
    title: string,
    desc: string,
    type: string,
    file: File
}

export const uploadDoc:RequestHandler<unknown, unknown, uploadBody, unknown> = async (req, res, next) => {
    console.log("Hello")
    console.log(req.body, req.files);
    // console.log(typeof(req.files?));

    const files= req.files as  {[fieldname: string]: Express.Multer.File[]};
    console.log(files['image'])
    const {noteId, title, desc, type} = req.body;
    let fileType:string = '';

    if (files['image']) {
        fileType = 'image'
    } else if (files['pdf']) {
        fileType = 'pdf'
    } else if (files['video']) {
        fileType = 'video'
    }

    const filename = files[fileType][0].filename

    try {
        if (!title || !desc || !filename) {
            throw createHttpError(400, 'parameter missing');
        }

        const newUpload = await UploadModel.create({
            title: title, description: desc, filename: filename, type: type
        });

        if (!newUpload) {
            throw createHttpError(409, 'Problem while uploading');
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(400, 'Problem occured');
        }

        note.uploads.push(newUpload._id)

        await note.save();

        await note.populate('uploads');

        res.status(200).json(note);
    } catch(error) {
        next(error); 
    }
}
