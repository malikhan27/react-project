
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts({pendingData,totalData,approvedData}) {
  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
        data: ['PENDING LOAN', 'TOTAL REQUEST', 'APPROVED LOAN'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [pendingData, totalData, approvedData],
           color: '#1a011f'
        },
      ]}
      height={300}
    />
  );
}
    
    
