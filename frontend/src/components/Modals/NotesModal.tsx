import { FormEvent, forwardRef, useState } from "react";
import { useParams } from "react-router-dom";

import GeneralInput from "../Inputs/GeneralInput";
import LongButtons from "../Buttons/LongButtons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { notebookActions } from "../../store/notebookStore";
import * as NoteApi from "../../network/note_api";

const NotesModal = forwardRef<HTMLDialogElement>((_, ref) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const notebook = useAppSelector((state) => state.notebook)
    const params = useParams();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);

        const fd = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(fd.entries())

        try {
            const newNote = await NoteApi.create({
                notebookId: params.notebookId as string,
                title: data.noteName as string,
                description: data.notedesc as string,
            })
            console.log(newNote);
            const notes = [...notebook.notes, newNote._id]
            const notesNames = [...notebook.notesName, newNote.title]

            dispatch(notebookActions.update({field: 'notes', newData: notes}))
            dispatch(notebookActions.update({field: 'notesName', newData: notesNames}))

            ref?.current.close()    // dont worry about error

            // window.location.reload();
        } catch(error) {
            console.log(error.message)
            console.log("Problem Occured while creating notebook, please try again!");
            setErrorMessage(error.message);
        }
    }

    return (
        <dialog ref={ref} className="bg-[#EAEAEA] px-4 py-7 rounded-lg w-1/3">
            <form method="dialog">
                <div className="w-full text-right">
                    <button className="font-lg text-gray-700 font-montserrat font-extrabold">X</button>
                </div>
            </form>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <GeneralInput label="Note Name" type="text" name="noteName" />
                    <GeneralInput label="Note Description" type="textarea" name="notedesc" />
                    {errorMessage && <p className="text-red-600 font-semibold font-roboto">Some Problem</p>}
                    <LongButtons text="Submit" bgColor="#FF2E63" textColor="#fff" type="submit" hoverColor="#ed2b5c" />
                </div>
            </form>
        </dialog>
    )
})

export default NotesModal
