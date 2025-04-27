import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

export default function SimpleCharts({ pendingData, totalData, approvedData }) {
  return (
    <Box sx={{ width: '100%', height: '100%' ,flexGrow: 3, paddingX: { xs: 2 } }}>
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
            color: '#1a011f',
          },
        ]
        }
        height={500}
        
        
      />
    </Box>
  );
}
