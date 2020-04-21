import * as React from "react";
import { useEffect, useRef } from "react";
import * as pdf from "pdfjs-dist";

type PDFViewProps = {
    path: string,
    page: number
}

const PDFView = (props: PDFViewProps) => {
    const { path, page } = props;
    const canvasId = "target";

    const canvanRef = useRef(null);

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
                        console.log("Page %d  loaded!", page);

                        // prepare canvas
                        let container = document.getElementsByClassName("viewer__pdf_image")[0] as HTMLElement
                        //let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
                        let canvas = (canvanRef.current as any);
                        let context = canvas.getContext('2d');
                        if(container){
                            const width = container.offsetWidth;
                            const height = container.offsetHeight;
                            canvas.height = height as number;
                            canvas.width = width as number;
                        }
                                              
                        let unscaledViewport = pageData.getViewport({scale:1});
                        let scale = Math.min((canvas.height / unscaledViewport.height), (canvas.width / unscaledViewport.width));
                        let viewport = pageData.getViewport({scale: Number.parseFloat(scale.toFixed(2))});
                        console.log("scale", scale, scale.toFixed(2), Number.parseFloat(scale.toFixed(2)));

                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        console.log("viewport sets size to width %d and height %d", viewport.width, viewport.height);
                        console.log("canvas sets size to width %d and height %d", container.offsetWidth, container.offsetHeight);


                        let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }

                        const renderTask = pageData.render((renderContext as any));


                        renderTask.promise.then(()=> {
                            console.log("Page Rendered")
                        });

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
            console.log("clean up")
        }
    }, [path, page]) // reduce redrawings, olny when 'path' or 'page' are changed

    return (
    
        <div className="viewer__pdf_image">
            <canvas ref={canvanRef} id={canvasId}></canvas>                        
        </div>
    )
}

export default PDFView;
