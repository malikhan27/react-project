import {DataGrid} from '@mui/x-data-grid';
import {useState, useEffect} from 'react';
import {supabase} from '../utils/config';
import * as React from 'react';
import {Paper} from '@mui/material';
import {Chip} from '@mui/material';
import { red } from '@mui/material/colors';

const columns = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'name', headerName: 'Name', flex: 1},
  {field: 'duration', headerName: 'Duration', flex: 1},
  {field: 'status',
    headerName: 'Status', 
    flex: 1,
    renderCell: (params) => {
        const value = params.value;
        let color = "default"
        if(value === "approved"){
            color = "success"}
            if(value === "rejected"){
                color = "error"
            }
            if(value === "pending"){
                color = "warning"
            }
            return <Chip label={value} color={color}  />;
    }},
  {
    field: 'income',
    headerName: 'Income',
    type: 'number',
    flex: 1,
  },
  {
    field: 'loanAmount',
    headerName: 'Loan Amount',
    type: 'number',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    flex: 1,
  },
];

const paginationModel = {page: 0, pageSize: 10};

export default function DataTable () {
  const [isLoading, setIsLoading] = useState (false);
  const [usersData, setUsersData] = useState ([]);

  useEffect (() => {
    userDetails ();
  }, []);

  const userDetails = async () => {
    try {
      const {data, error} = await supabase.from ('loanRequest').select ();
      if (error) throw error;
      if (data) {
        setUsersData (data);
      }
    } catch (error) {}
  };

  return (
    <Paper
      sx={{
        height: '90%',
        width: '95%',
        bgcolor: '#f1befa',
        borderRadius: 4,
        padding: 2,
        marginTop: 3,
        marginX: 2,
      }}
    >
      <DataGrid
        rows={usersData}
        columns={columns}
        initialState={{pagination: {paginationModel}}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{border: 1, borderColor: '#000000', borderRadius: 4}}
      />
    </Paper>
  );
}
