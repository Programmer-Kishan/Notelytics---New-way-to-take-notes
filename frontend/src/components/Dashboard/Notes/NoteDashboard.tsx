import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as NoteApi from "../../../network/note_api";
import { noteActions } from "../../../store/noteStore";
import NoteInfoModal from "../../Modals/NoteInfoModal";
// import NoteInformation from "./NoteInformation";
import DisplayPdf from './DisplayPdf';
import DisplayImage from "./DisplayImage";
import DisplayVideo from "./DisplayVideo";

const NoteDashboard = () => {

    const {noteId} = useParams();

    const dispatch = useAppDispatch();
    const note = useAppSelector(state => state.note);

    const noteModelRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        async function findNote() {
          console.log("logging note id", noteId);
            try {
                const note = await NoteApi.findNoteById({id: noteId as string});
                console.log("From note dashboard: ", note);
                dispatch(noteActions.save(note));
            } catch (error) {
                console.log(error);
            }
        }
        findNote();
    }, [])

  return (
    <div className='w-full h-fit min-h-screen bg-[#252A34] py-20 px-32 text-[#EAEAEA]'>
      <NoteInfoModal ref={noteModelRef}/>
      <h1 className="text-6xl text-center font-montserrat font-extrabold">{note.title}</h1>
      <p className="text-xl text-center italic my-7">"{note.description}"</p>
      <DisplayPdf pdfs={note.uploads.filter(x => x.type === 'Pdf')} />
      <DisplayImage images={note.uploads.filter(x => x.type === 'Image')} />
      <DisplayVideo videos={note.uploads.filter(x => x.type === 'Video')} />
      <div className="w-full p-5 bg-slate-400/45 rounded-lg text-center">
        <button 
          className="font-roboto font-semibold bg-[#08D9D6] text-black text-xl rounded-md p-4"
          onClick={() => noteModelRef.current?.showModal()}
        >
          + Add Notes 
        </button>
      </div>
    </div>
  )
}

export default NoteDashboard
