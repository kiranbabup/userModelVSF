import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { Box, IconButton } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { mediaQueries } from '../assets/data/styles';

const Container = styled.div`
  width: 70vw;
  overflow-x: auto;
  ${mediaQueries.mobile} {
    width: 90%; 
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${mediaQueries.mobile} {
    width: 100%; 
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
  ${mediaQueries.mobile} {
    font-size: 9px;
    padding: 4px;
  }
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  ${mediaQueries.mobile} {
    font-size: 8px;
    padding: 4px;
  }
`;

const ReadExcel = ({ file, name }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" }); // Ensure empty cells are also included
      setData(jsonData);
      if (jsonData.length) {
        const cols = Object.keys(jsonData[0]).map((key) => ({ Header: key, accessor: key }));
        setColumns(cols);
      }
    };

    fetchData();
  }, [file]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const csvDownload = ()=>{
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =  `${name}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"end", marginRight:"5rem"}}>
      <IconButton onClick={()=>csvDownload()} ><DownloadForOfflineIcon color='primary' fontSize="large" /> </IconButton>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container >
        {data.length > 0 && (
          <Table {...getTableProps()} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </Box>
    </>
  );
};

export default ReadExcel;
