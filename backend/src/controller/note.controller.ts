import { RequestHandler } from "express";
import createHttpError from "http-errors";

import NoteModel from "../models/note";
import NotebookModel from "../models/notebook";

interface CreateNoteBody {
    notebookId: string,
    title: string, 
    description: string
}

export const CreateNote:RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req, res, next) => {
    const {notebookId, title, description} = req.body;
    console.log(req.body);
    try {
        if (!title || !description) {
            throw createHttpError(400, "Parameter Missing");
        }

        const newNote = await NoteModel.create({
            title, description
        });

        const notebook = await NotebookModel.findById(notebookId).exec();

        if (!notebook) {
            throw createHttpError(400, "Notebook Not Found");
        }

        notebook.notes.push(newNote._id);
        notebook.notesName.push(newNote.title);

        await notebook.save();

        res.status(200).json(newNote);
    } catch(error) {
        next(error);
    }
}

interface FindNoteByIdBody {
    id: string
}

export const FindNoteById:RequestHandler<unknown, unknown, FindNoteByIdBody, unknown> = async(req, res, next) => {
    const { id } = req.body;

    try {
        if (!id) {
            throw createHttpError(400, 'parameter missing');
        }

        const note = await NoteModel.findById(id);

        if (!note) {
            throw createHttpError(400, "Note not found");
        }

        if (!(note.uploads.length === 0))
            await note.populate('uploads');
        console.log(note);

        res.status(200).json(note);
    } catch(error) {
        next(error);
    }
}