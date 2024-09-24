import Video from './Video'

interface VideoStruct{
    title: string,
    description: string,
    filename: string
}
  
interface VideoProps {
    videos: VideoStruct[]
}


const DisplayVideo = ({videos}: VideoProps) => {
    return (
        videos.map(video => (<Video key={Math.random()} fileName={video.filename} title={video.title} description={video.description}/>))
    )
}

export default DisplayVideo
