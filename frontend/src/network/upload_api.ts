import { Note } from "../models/note";
import { fetchData } from "../utils/fetchApiData";

export async function upload(data: FormData): Promise<Note> {
    const response = await fetchData(
        '/api/upload/',
        {
            method: "POST", 
            // headers: {
            //     'Content-Type': "multipart/form-data"
            // },
            body: data
        }
    );
    return response.json();
}