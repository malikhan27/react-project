import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {supabase} from '../utils/config';
import {useEffect, useState} from 'react';


const fetchedData = [
]

async function getData() {
  try {
    const { data, error } = await supabase
    .from('loanRequest')
    .select()
    if (error) throw error;
    if (data) {
      data.map((item) => {
        fetchedData.push({
          item
        });
    })
      console.log(fetchedData);
    }

  } catch (error) {
    
  }
  }
getData();



export default function  MyLoanContent() {
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">INCOME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">LOAN AMOUNT</TableCell>
            <TableCell align="right">DURATION</TableCell>
            <TableCell align="right">STATUS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedData.map((val,ind) => (
            <TableRow
              key={val.item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  component="th" scope="row">
                {val.item.name}
              </TableCell >
              <TableCell  align="right">{val.item.income}</TableCell >
              <TableCell  align="right">{val.item.email}</TableCell >
              <TableCell  align="right">{val.item.loanAmount}</TableCell >
              <TableCell  align="right">{val.item.duration}</TableCell >
              <TableCell  align="right">{val.item.status}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




