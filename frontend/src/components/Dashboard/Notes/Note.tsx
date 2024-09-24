import { useParams, useNavigate } from "react-router-dom";
import { BackgroundGradient } from "../../ui/background-gradient";

interface NoteProps {
    ids: string[]
    notebook: string[]
}

const Note = ({ ids, notebook }: NoteProps) => {

    const { userId, notebookId } = useParams();
    const navigate = useNavigate();


    return (
        notebook.map((note, ind) => (
            <div key={Math.random()} onClick={() => navigate(`/user/${userId}/${notebookId}/${ids[ind]}`) }>
                <BackgroundGradient
                    className="p-4 bg-[#252A34] rounded-[22px] text-center cursor-pointer"
                >
                    <h4 className="text-2xl font-poppins">{note}</h4>
                </BackgroundGradient>
            </div>
        ))

    )
}

export default Note
