import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { Notebook } from "../models/notebook";

let initialState:Notebook;
const notebook = Cookies.get('notebook');
if (!notebook) {
    initialState = {
        _id: "", userId: "", title: "", description: "", notes: [], notesName: []
    } 
} else {
    initialState = JSON.parse(notebook);
}

const notebookSlice = createSlice({
    name: 'notebook', 
    initialState,
    reducers: {
        save(state, action: PayloadAction<Notebook>) {
            Object.assign(state, action.payload); 
            Cookies.set('notebook', JSON.stringify(action.payload))
        },
        update(state, action: PayloadAction<{field: string, newData: string[] | string}>) {
            const x = {...state, [action.payload.field]: action.payload.newData}
            Object.assign(state, x);
            Cookies.set('notebook', JSON.stringify(x))
        }
    }
})

export const notebookActions = notebookSlice.actions;

export default notebookSlice.reducer;