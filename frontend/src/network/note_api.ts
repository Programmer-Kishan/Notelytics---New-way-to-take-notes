import { Note } from "../models/note";
import { fetchData } from "../utils/fetchApiData";

interface CreateNoteCredentials {
    notebookId: string,
    title: string,
    description: string
}

export async function create(credentials: CreateNoteCredentials): Promise<Note> {
    console.log(credentials);
    const response = await fetchData(
        "/api/note/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    );
    return response.json();
}

interface FindNoteByIdCredentials {
    id: string
}

export async function findNoteById(credentials: FindNoteByIdCredentials): Promise<Note> {
    const response = await fetchData(
        "/api/note/findById",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    )
    return response.json();
}