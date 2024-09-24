import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userStore";
import notebookReducer from "./notebookStore";
import noteReducer from "./noteStore";

const store = configureStore({
    reducer: {user: userReducer, notebook: notebookReducer, note: noteReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
