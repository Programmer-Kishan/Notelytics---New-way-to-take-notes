import { RequestHandler } from "express";
import createHttpError from "http-errors";

import UserModel from "../models/user";
import NotebookModel from "../models/notebook";

interface CreateNotebookBody {
    title: string,
    description: string,
}

export const CreateNotebook:RequestHandler<unknown, unknown, CreateNotebookBody, unknown> = async(req, res, next) => {
    const userId = req.session["userId"];
    const {title, description} = req.body;

    try {
        if (!userId) {
            throw createHttpError(401, "Login Again");
        }

        if (!title || !description) {
            throw createHttpError(400, "Parameter Missing");
        }

        const newNotebook = await NotebookModel.create({
            userId: userId, title: title, description: description
        });


        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(400, "User Not Found");
        }

        console.log(newNotebook)
        user.notebooks.push(newNotebook._id);
        user.notebookNames.push(newNotebook.title as string)

        await user.save();

        res.status(200).json(newNotebook);
    } catch (error) {
        next(error);
    }
}

interface FindNotebookBody {
    id: string
}

export const FindNotebook:RequestHandler<unknown, unknown, FindNotebookBody, unknown> = async(req, res, next) => {
    const { id } = req.body;

    try {
        if (!id) {
            throw createHttpError(400, "Parameter Missing");
        }

        const notebook = await NotebookModel.findById(id);

        if (!notebook) {
            throw createHttpError(400, "Notebook not found");
        }

        res.status(200).json(notebook);
    } catch(error) {
        next(error)
    }
}