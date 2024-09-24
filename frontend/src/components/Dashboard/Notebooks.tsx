import Notebook from "./Notebook"

interface NotebooksProps {
    ids: string[]
    names: string[]
}

const Notebooks = ({ ids, names }: NotebooksProps) => {
    return (
        <div className="w-full h-fit grid grid-cols-3 py-10 gap-10">
            {names.map((name, ind) => <Notebook key={Math.random()} id={ids[ind]} name={name}/>)}
        </div>
    )
}
 
export default Notebooks
