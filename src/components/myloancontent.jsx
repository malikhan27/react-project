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
import { Badge } from 'react-bootstrap';


const fetchedData = [
]

export async function getData() {
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
          <TableRow >
            <TableCell>NAME</TableCell>
            <TableCell align="center">INCOME</TableCell>
            <TableCell align="center">EMAIL</TableCell>
            <TableCell align="center">LOAN AMOUNT</TableCell>
            <TableCell align="center">DURATION</TableCell>
            <TableCell align="center">STATUS</TableCell>

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
              <TableCell  align="center">{val.item.income}</TableCell >
              <TableCell  align="center">{val.item.email}</TableCell >
              <TableCell  align="center">{val.item.loanAmount}</TableCell >
              <TableCell  align="center">{val.item.duration}</TableCell >
              <TableCell  align="center">{val.item.status=="pending"?<Badge className='bg-warning' >{val.item.status}
              </Badge>:val.item.status=="rejected"?<Badge className='bg-danger' >{val.item.status}</Badge>:<Badge className='bg-success'>{val.item.status}</Badge>}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




