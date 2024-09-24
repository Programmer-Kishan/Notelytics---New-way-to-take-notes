interface VideoProps {
    fileName: string
    title: string,
    description: string,
}

const Video = ({fileName, title, description}: VideoProps) => {
  return (
    <div className="w-full min-h-fit bg-slate-400/45 p-4 rounded-lg my-4 flex gap-7 justify-evenly">
        <div className="w-2/5 mx-auto">
            <video width="500" height="400" controls>
                <source src={`http://localhost:5000/videos/${fileName}`} type="video/mp4" />
            </video>
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

export default Video
