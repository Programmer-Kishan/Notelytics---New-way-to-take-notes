
interface ImageProps {
    fileName: string
    title: string,
    description: string,
}

const Image = ({fileName, title, description}: ImageProps) => {
  return (
    <div className="w-full min-h-fit bg-slate-400/45 p-4 rounded-lg my-4 flex gap-7 justify-evenly">
        <div className="w-2/5 mx-auto">
            <img src={`http://localhost:5000/images/${fileName}`}  alt={title} />
        </div>
        <div className="w-3/5 overflow-y-auto text-center flex flex-col justify-evenly no-scroll">
          <div>
            <h1 className="italic underline font-montserrat font-extrabold text-5xl text-[#EAEAEA]">{title}</h1>
          </div>
          <div className="h-80 pt-5">
            <p className="text-xl font-poppins text-justify">{description}</p>
          </div>
        </div>
    </div>
  )
}

export default Image
