import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

export default function SimpleCharts({ pendingData, totalData, approvedData }) {
  return (
    <Box sx={{ width: '100%' , paddingX: { xs: 2 }, display: 'flex', flexDirection: 'column'}}>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['PENDING', 'TOTAL', 'APPROVED'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [pendingData, totalData, approvedData],
            color: ' rgba(50, 178, 233, 0.94)',
          },
        ]
        }
        height={300}
        
        
      />
    </Box>
  );
}
