import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { Note } from "../models/note";

let initialState:Note;
const note = Cookies.get('note');
if (!note) {
    console.log("No Note from cookies");
    initialState = {
        _id: "", title: "", description: "", uploads: [],
    } 
} else {
    console.log("From getting cookies", JSON.parse(note));
    initialState = JSON.parse(note);
}

const noteSlice = createSlice({
    name: 'note', 
    initialState,
    reducers: {
        save(state, action: PayloadAction<Note>) {
            Object.assign(state, action.payload); 
            Cookies.set('note', JSON.stringify(action.payload))
        },
        update(state, action: PayloadAction<{field: string, newData: string[] | string}>) {
            const x = {...state, [action.payload.field]: action.payload.newData}
            Object.assign(state, x);
            Cookies.set('note', JSON.stringify(x))
        }
    }
})

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;