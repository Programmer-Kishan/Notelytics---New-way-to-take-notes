import express from "express";

import * as NotesController from "../controller/note.controller";

const router = express.Router();

router.post("/create", NotesController.CreateNote);
router.post("/findById", NotesController.FindNoteById);

export default router;