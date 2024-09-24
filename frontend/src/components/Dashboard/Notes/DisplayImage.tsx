import Image from './Image'

interface ImageStruct{
    title: string,
    description: string,
    filename: string
}
  
interface ImageProps {
    images: ImageStruct[]
}

const DisplayImage = ({images}: ImageProps) => {
    return (
        images.map(image => (<Image key={Math.random()} fileName={image.filename} title={image.title} description={image.description}/>))
    )
}

export default DisplayImage
