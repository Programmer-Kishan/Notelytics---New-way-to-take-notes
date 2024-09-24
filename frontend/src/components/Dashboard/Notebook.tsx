import { useNavigate, useParams } from "react-router-dom"

interface NotebookProps {
    id: string
    name: string
}

const Notebook = ({ id, name }: NotebookProps) => {

    const navigate = useNavigate();
    const { userId } = useParams();

    return (
        <div className="w-3/4 h-fit p-4 bg-[#1d2028] rounded-lg bg-gradient-to-br from-[#d4fc86]/90 to-[#9BEC00]/70">
            <h1 className="font-montserrat font-semibold text-3xl">{name}</h1>
            <div className="w-full text-right mt-5 hover:tracking-wider transition-all" onClick={() => navigate(`/user/${userId}/${id}`)}>
                <button>View Details {">"}</button>
            </div>
        </div>
    )
}

export default Notebook
