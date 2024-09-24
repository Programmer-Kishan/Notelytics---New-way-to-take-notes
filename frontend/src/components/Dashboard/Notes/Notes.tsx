import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";


import EmptyNotes from "./EmptyNotes";
import * as NotebookApi from "../../../network/notebook_api"
import NotesModal from "../../Modals/NotesModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { notebookActions } from "../../../store/notebookStore";
import Note from "./Note";

const Notes = () => {

  const params = useParams();
  console.log(params);

  const NotesDialog = useRef<HTMLDialogElement>(null)

  const dispatch = useAppDispatch();
  const notebook = useAppSelector(state => state.notebook);

  useEffect(() => {
    async function getNotebook() {
      try {
        const Notebook = await NotebookApi.findNotebookById({ id: params.notebookId as string })
        dispatch(notebookActions.save(Notebook));
      } catch (error) {
        console.log(error);
      }
    }
    getNotebook();
  }, [])

  return (
    <div className="w-full h-fit min-h-screen bg-[#252A34] py-20 px-32 text-[#EAEAEA]">
      <NotesModal ref={NotesDialog}/>
      <h1 className="text-6xl font-montserrat font-extrabold text-[#FF2E63]">{notebook?.title}</h1>
      <hr className="w-3/5 font-extrabold border-dotted border-t-[10px] border-[#EAEAEA]" />
      <p className="my-5 font-poppins text-lg italic w-4/5 text-[#08D9D6]">{notebook?.description}</p>
      <h3 className="text-4xl font-montserrat font-semibold mb-4">Notes: </h3>
      <div className="flex flex-col gap-10">
        {notebook?.notesName.length === 0 ? <EmptyNotes /> : <Note notebook={notebook?.notesName} ids={notebook?.notes} />
        }
        <button 
          className="w-1/5 bg-[#08D9D6] text-black text-xl font-roboto py-3 mx-auto rounded-lg font-semibold"
          onClick={() => NotesDialog.current?.showModal()}
        >
          +Add Note
        </button>
      </div>
    </div>
  )
}

export default Notes
