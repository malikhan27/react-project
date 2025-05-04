import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/config';
import * as React from 'react';
import { Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

export default function DataTable() {
  const isSmall = useMediaQuery('(max-width:800px)');

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 100, align: "center", headerAlign: "center" },
    { field: 'name', headerName: 'Name', minWidth: 150, align: "center", headerAlign: "center" },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const value = params.value;
        let color = "default";
        if (value === "approved") color = "success";
        if (value === "rejected") color = "error";
        if (value === "pending") color = "warning";
        return <Chip label={value} color={color} />;
      }
    },
    { field: 'loanAmount', headerName: 'Loan Amount', type: 'number', minWidth: 140, align: "center", headerAlign: "center" },
    ...(!isSmall ? [
      { field: 'duration', headerName: 'Duration', minWidth: 130, align: "center", headerAlign: "center" },
      { field: 'income', headerName: 'Income', type: 'number', minWidth: 130, align: "center", headerAlign: "center" },
      { field: 'email', headerName: 'Email', minWidth: 200, align: "center", headerAlign: "center" },
    ] : [])
  ];

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      const { data, error } = await supabase.from('loanRequest').select();
      if (error) throw error;
      if (data) {
        setUsersData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: 800 }}> {/* Ensures DataGrid gets enough width */}
      <DataGrid
  rows={usersData}
  columns={columns}
  initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
  autoHeight
  sx={{
    border: 1,
    borderColor: '#38bdf8', // sky blue border
    color: '#0a192f',        // dark blue text
    '& .MuiDataGrid-cell': {
      color: '#0a192f',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#e3f2fd', // sky blue header
      color: '#0a192f',
      fontWeight: 'bold',
    },
    '& .MuiCheckbox-root svg': {
      fill: '#38bdf8', // sky blue checkboxes
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#e3f2fd',
      color: '#0a192f',
    }
  }}
/>

      </Box>
    </Box>
  );
}
