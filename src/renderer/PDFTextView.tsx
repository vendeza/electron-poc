import * as React from "react";
import { useEffect, useRef } from "react";
import * as pdf from "pdfjs-dist";

type PDFViewProps = {
    path: string,
    page: number
}

const PDFView = (props: PDFViewProps) => {
    const { path, page } = props;
    const textBlockId = "text_target";
    const textBlockRef = useRef(null);
    useEffect(()=> {
        
        if(!path || path.length == 0){
            return;
        }

        const doc = pdf.getDocument(path).promise;
        // Asynchronous download of PDF
        doc.then(
            // success
            (pdfDoc) => {
                console.debug('document loaded');

                pdfDoc.getPage(page).then(
                    (pageData) => {
                        console.debug("Page %d  loaded!", page);

                       // let textContainer = document.getElementById(textBlockId) as HTMLCanvasElement;
                       
                        let task = pageData.getTextContent();
                        task.then(
                            (textContent) => {
                                let text = textContent.items.map((s) => {return s.str;}).join('<br>');
                                //textContainer.innerHTML = text;
                                let textRef = (textBlockRef.current as any)
                                textRef.innerHTML = text
                                
                            }, 
                            (err) => {
                                console.error(err);
                            }
                        )

                    }, 
                    (pageErr) => {
                        console.error(pageErr);
                    })

            },
            //error
            (error) => {
                console.error(error);
            }
        );
        //unmount
        return () => {
            console.debug("clean up")
        }
    }, [path, page]) // reduce redrawings, olny when 'path' or 'page' are changed

    return (
        <div className="viewer__pdf_text">
            <div id="text_target" ref={textBlockRef} style={{ whiteSpace: 'pre', overflow: 'scroll', width:'100%', height:'100%' }} ></div>
        </div>
    )
}

export default PDFView;