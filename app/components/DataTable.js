"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

export default function DataTable( {xls, setData} ) {

    const [options, setOptions] = useState([])
    const [body, setBody] = useState([])
    const [rows, setRows] = useState([])
    const [header_row, setHeader_row] = useState([])
    const [error, setError] = useState("")

    useEffect(()=> {
        const header_row = xls[0]
        const header = []
        header_row.forEach(h => {
            header.push({
                field: h,
            })
        })
        setHeader_row(header)
        const rows = xls.slice(1)
        const r = []
        rows.forEach((row, index) => {
            const obj = {
                id: index,
            }
            for (let i = 0; i < header.length; i++) {
                obj[`${header[i].field}`] = row[i]
            }
            r.push(obj)
        })
        console.log(r)
        setRows(r)
    }, [])

        return (
        <>

            <Paper style={{margin: "50px"}}>
            <DataGrid
                rows={rows}
                columns={header_row}
            />
            </Paper>
            <Button
                color="error"
                style={{marginLeft: "10px"}}
                variant="outlined"
                onClick={()=> {
                    setData(null)
                }}
            >Cancel</Button>
            {error && <Alert severity="error"><div dangerouslySetInnerHTML={{__html: error.replaceAll('\\n', '').replaceAll('"', '').replaceAll('\\', '')}}></div></Alert>}
        </>
    );
}