import { useState } from "react";
import { Document, Page } from "react-pdf";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";

interface PdfProps {
    fileName: string
    title: string,
    description: string,
}

const Pdf = ({fileName, title, description}: PdfProps) => {

  console.log(fileName, title, description)

const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleIncrement() {
    const pgno = pageNumber+1
    if (pgno === numPages + 1) {
        setPageNumber(1);
        return ;
    }
    setPageNumber(pgno)
  }

  function handleDecrement() {
    const pgno = pageNumber-1
    if (pageNumber - 1 === 0) {
        setPageNumber(numPages);
        return ;
    }
    setPageNumber(pgno)
  }

  return (
    <div className="w-full min-h-fit bg-slate-400/45 p-4 rounded-lg my-4 flex gap-7 justify-evenly">
        <div className="w-2/5 mx-auto">
            <Document 
                file={`http://localhost:5000/pdfs/${fileName}`} 
                onLoadSuccess={onDocumentLoadSuccess} 
                // className="pdf-body"
            >
                <p>Page {pageNumber} of {numPages}</p>
                <div className="flex justify-center items-center">
                    <button onClick={handleDecrement}>
                        <FaCaretLeft className="w-10 text-6xl px-2"/>
                    </button>
                    <Page pageNumber={pageNumber} renderTextLayer={false}
                            renderAnnotationLayer={false} height={550}/>
                    <button onClick={handleIncrement}>
                        <FaCaretRight className="w-10 text-6xl px-2"/>
                    </button>
                </div>
            </Document>
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

export default Pdf
