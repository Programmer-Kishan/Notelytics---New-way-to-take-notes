import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { User } from "../models/user";

let initialState:User;
const user = Cookies.get('user');
if (!user) {
    initialState = {
        username: '', email: '', notebookNames: [], notebooks: [], _id: '' 
    } 
} else {
    initialState = JSON.parse(user);
}

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        save(state, action: PayloadAction<User>) {
            Object.assign(state, action.payload); 
            Cookies.set('user', JSON.stringify(action.payload))
        },
        update(state, action: PayloadAction<{field: string, newData: string[] | string}>) {
            const x = {...state, [action.payload.field]: action.payload.newData}
            Object.assign(state, x);
            Cookies.set('user', JSON.stringify(x))
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;