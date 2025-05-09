import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [6000000,200000,300000] }]}
      series={[
        {
          data: [20000000, 30000000, 40000000],
        },
      ]}
      height={300}
    />
  );
}