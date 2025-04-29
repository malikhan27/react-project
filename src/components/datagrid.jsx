import {DataGrid} from '@mui/x-data-grid';
import {useState, useEffect} from 'react';
import {supabase} from '../utils/config';
import * as React from 'react';
import {Paper} from '@mui/material';
import {Chip} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function DataTable () {
  const isSmall = useMediaQuery('(max-width:800px)');


const columns = [
  { field: 'id', headerName: 'ID', flex: 1, align:"center", headerAlign:"center",},
  { field: 'name', headerName: 'Name', flex: 1, align:"center", headerAlign:"center" },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1, align:"center", headerAlign:"center",
    renderCell: (params) => {
      const value = params.value;
      let color = "default";
      if (value === "approved") color = "success";
      if (value === "rejected") color = "error";
      if (value === "pending") color = "warning";
      return <Chip label={value} color={color} />;
    }
  },
  { field: 'loanAmount', headerName: 'Loan Amount', type: 'number', flex: 1, align:"center", headerAlign:"center" },
  ...(!isSmall ? [
    { field: 'duration', headerName: 'Duration', flex: 1, align:"center", headerAlign:"center" },
    { field: 'income', headerName: 'Income', type: 'number', flex: 1, align:"center", headerAlign:"center" },
    { field: 'email', headerName: 'Email', flex: 1, align:"center", headerAlign:"center" },
  ] : [])
];


const paginationModel = {page: 0, pageSize: 10};

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
  
      <DataGrid
        rows={usersData}
        columns={columns}
        initialState={{pagination: {paginationModel}}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{border: 1, borderColor: '#000000',}}
      />
  
  );
}
