import { useState, useEffect, useContext } from 'react';
import { CompleteDataContext } from '../context/completeData';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Loader from './loader';

export default function AdminDashContent() {
  const { completeData } = useContext(CompleteDataContext);
  const [chartData, setChartData] = useState({ dates: [], loans: [] });

  useEffect(() => {
    const approvedData = completeData
      .filter((item) => item.status === 'approved')
      .map((item) => ({
        loan: item.loanAmount,
        dateObj: new Date(item.created_at),
        dateStr: new Date(item.created_at).toLocaleDateString(),
      }))
      .sort((a, b) => a.dateObj - b.dateObj);

    const dates = approvedData.map((item) => item.dateStr);
    const loans = approvedData.map((item) => item.loan);

    setChartData({ dates, loans });
  }, [completeData]);

 
 
 
  return (  
   
   <Box>
    {chartData.dates.length === 0 ? (
        <Box sx={{ width: '100%', paddingX: { xs: 2 },height: '100%', marginY:"10%" ,display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Loader size={50} />
        </Box>
    ) : (
      <Box sx={{ width: '100%', paddingX: { xs: 2 }, display: 'flex', flexDirection: 'column' }}>
        <BarChart
          xAxis={[{ data: chartData.dates }]}
          series={[{ data: chartData.loans, label: 'Approved Loan Amount by Dates', color: '#1976d2' }]}
          height={290}
        />
      </Box>
    )}
  
  </Box>
   
  );
}
