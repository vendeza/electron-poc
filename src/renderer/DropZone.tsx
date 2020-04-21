import * as React from 'react';
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';



export type DropzoneProps = {
    fn: (fileArray: any[]) => void
}

const DropZone = (props: DropzoneProps) => {
    const {fn} = props;
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      const onlyPdf = (acceptedFiles as []).filter(s => (s as any).name.split('.').pop() === 'pdf')
      fn(onlyPdf);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some pdf files here, or click to select files</p>
        }
      </div>
    )
};

export default DropZone;