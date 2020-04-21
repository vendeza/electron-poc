import * as React from 'react';
import {useState, useEffect } from 'react';
import "./Application.css";
import DropZone from './DropZone';
import PDFView from "./PDFView";
import PDFTextView from "./PDFTextView";


type FileEntity = {
    /**
     * File name(with extension)
     */
    name: String;
    /**
     * File path
     */
    path: String;
};

const DEFAULT_STATE: FileEntity[] = [];

const Application = () => {
    const [files, setFiles] = useState(DEFAULT_STATE);
    console.log("SEEEE ME")
    const [currentFile, setCurrentFile] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    const renderListItem = (item: any, index:number, handle:(name: string, path:string) => void) => (
        <div key={index} className="filelist__item" onClick = { () => {
            handle(item.name, item.path);
        }}>
            <p>{item.name}</p>
        </div>
    );
    
     const appendFileList = (array: any) => {
        const transform = (el:any) => { return { path: el.path, name: el.name}};
        setFiles( prev => [ ...prev, ...array.map(transform)])
    }

    const onListItemClicked = (name: string, path: string): void => {
        console.debug('Clicked on item: ', name, path)
        setCurrentFile(path);
        setCurrentPage(1); // reset page
    }

    const onPrev = () => {
        console.log("on previous page");
        if(currentPage - 1 > 0){
            setCurrentPage(currentPage - 1);
        }
    }

    const onNext = () => {
        console.log("on next page");
        if(currentPage > 0){
            setCurrentPage(currentPage + 1)
        }
    }



    return (
        <div className="container">
            {/* DROP ZONE */}
            <div className="container__dropzone">
                <DropZone fn={ appendFileList}></DropZone>
            </div>

            {/* MAIN CONTENT */}
            <div className="container__content">

                {/* LIST OF FILES */}
                <div className="filelist">
                    <div className="filelist__">
                        {files.map((el, idx) => renderListItem(el, idx, (a,b) => onListItemClicked(a,b)))}
                    </div>
                </div>

                {/* PDF STAFF */}
                <div className="viewer_container">
                    <div className="viewer_wrapper">
                        <PDFView path={currentFile} page={currentPage}/>
                        <PDFTextView path={currentFile} page={currentPage}/>
                    </div>

                    {/* CONTROLS */}
                    <div className="viewer__controlls">
                            <button onClick={onPrev}>Previous</button>
                            <button onClick={onNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Application;