import { FormEvent, forwardRef, useState } from "react";

import GeneralInput from "../Inputs/GeneralInput";
import LongButtons from "../Buttons/LongButtons";
import * as NotebookApi from "../../network/notebook_api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { userActions } from "../../store/userStore";

const NoteBookModal = forwardRef<HTMLDialogElement>((_, ref) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user)
    console.log(user);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErrorMessage(null);

        const fd = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(fd.entries())
        console.log(data);

        try {
            const newNotebook = await NotebookApi.create({
                title: data.notebookName as string,
                description: data.notebookdesc as string,
            })
            console.log(newNotebook);
            const ids = [...user.notebooks, newNotebook._id]
            const names = [...user.notebookNames, newNotebook.title]

            dispatch(userActions.update({field: 'notebooks', newData: ids}))
            dispatch(userActions.update({field: 'notebookNames', newData: names}))

            console.log(user);

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
                    <GeneralInput label="Note Book Name" type="text" name="notebookName" />
                    <GeneralInput label="Note Book Description" type="textarea" name="notebookdesc" />
                    {errorMessage && <p className="text-red-600 font-semibold font-roboto">Some Problem</p>}
                    <LongButtons text="Submit" bgColor="#FF2E63" textColor="#fff" type="submit" hoverColor="#ed2b5c" />
                </div>
            </form>
        </dialog>
    )
})

export default NoteBookModal
