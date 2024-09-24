import Pdf from "./Pdf";

interface PdfStruct{
  title: string,
  description: string,
  filename: string
}

interface PdfProps {
  pdfs: PdfStruct[]
}

const DisplayPdf = ({pdfs}: PdfProps) => {

  return (
    pdfs.map(pdf => (<Pdf key={Math.random()} fileName={pdf.filename} title={pdf.title} description={pdf.description}/>))
  )
}

export default DisplayPdf
