"use client";

import React, { useCallback, useState, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { read, utils, writeFile } from 'xlsx';
import DataTable from './DataTable';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function DragAndDropFiles() {


    const [file, setFile] = useState(null);
    const [data, setData] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file)=> {
            setFile(file)
        })
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop
        }
    )

    useEffect(()=> {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const wb = read(reader.result)
                const ws = wb.Sheets[wb.SheetNames[0]]
                const raw_data = utils.sheet_to_json(ws, {header:1})
                setData(raw_data)
            };
            reader.readAsArrayBuffer(file);
        }
    }, [file])

        return (
            <center>
            
            {!data && <div {...getRootProps()}>
                <input {...getInputProps()} /><Paper 
                variant="outlined"
                style={{margin: "50px", width: "80%", minHeight: "20vh", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "#dcdcdc"}}
            > 
            
                <Chip 
                    color="primary"
                    style={{cursor: "pointer", color: "#fff", fontWeight: "800"}}

                    label={
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                />
                
            
            </Paper>
             </div>}
                {data && <DataTable 
                    setData={setData}
                    xls={data} 
                />}
           
            </center>
        )

}