import { FormEvent, forwardRef, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

import GeneralInput from "../Inputs/GeneralInput";
import LongButtons from "../Buttons/LongButtons";
import * as UploadApi from "../../network/upload_api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { noteActions } from "../../store/noteStore";

interface CheckedState {
    checkedI: boolean
    checkedp: boolean
    checkedv: boolean
}

interface CheckedActions {
    type: 'Image' | 'Pdf' | 'Video'
}

const checkedReducer = (state: CheckedState, action: CheckedActions) => {
    switch(action.type) {
        case 'Image':
            return {checkedI: true, checkedp: false, checkedv: false} 
        case 'Pdf':
            return {checkedI: false, checkedp: true, checkedv: false} 
        case 'Video':
            return {checkedI: false, checkedp: false, checkedv: true} 
        default:
            return state
    }
}


const NoteInfoModal = forwardRef<HTMLDialogElement>((_, ref) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [checked, dispatchChecked] = useReducer(checkedReducer, {checkedI: true, checkedp: false, checkedv: false})
    
    const params = useParams();

    const dispatch = useAppDispatch();
    const note = useAppSelector((state) => state.note)
    console.log(note);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage(null);

        const fd = new FormData(event.target as HTMLFormElement);
        fd.append('noteId', params.noteId as string);
        // const data = Object.fromEntries(fd.entries())
        // console.log(data);


        if (checked.checkedI) {
            fd.append('type', 'Image')
        }
        if (checked.checkedp) {
            fd.append('type', 'Pdf')
        }
        if (checked.checkedv) {
            fd.append('type', 'Video')
        }
        const data = Object.fromEntries(fd.entries())
        console.log(data);

        try {
            const note = await UploadApi.upload(fd);
            console.log(note);

            dispatch(noteActions.save(note))


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
                    <div className="flex gap-20 items-center justify-center">
                        <GeneralInput 
                            label="Image" 
                            type="radio" 
                            name="image" 
                            stateVar={checked.checkedI} 
                            statefn={() => {dispatchChecked({type: 'Image'})}}
                        />
                        <GeneralInput 
                            label="Pdf" 
                            type="radio" 
                            name="pdf" 
                            stateVar={checked.checkedp}
                            statefn={() => {dispatchChecked({type: 'Pdf'})}}
                        />
                        <GeneralInput 
                            label="Video" 
                            type="radio" 
                            name="video" 
                            stateVar={checked.checkedv}
                            statefn={() => {dispatchChecked({type: 'Video'})}}
                        />
                    </div>
                    {checked.checkedI && <GeneralInput label="" type="file" name="image"/>}
                    {checked.checkedp && <GeneralInput label="" type="file" name="pdf" />}
                    {checked.checkedv && <GeneralInput label="" type="file" name="video" />}
                    <GeneralInput label="Title" type="text" name='title' />
                    <GeneralInput label="description" type="textarea" name="desc" />
                    {errorMessage && <p className="text-red-600 font-semibold font-roboto">Some Problem</p>}
                    <LongButtons text="Submit" bgColor="#FF2E63" textColor="#fff" type="submit" hoverColor="#ed2b5c" />
                </div>
            </form>
        </dialog>
    )
})

export default NoteInfoModal
