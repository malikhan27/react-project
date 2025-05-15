import { useState, useEffect, useContext } from "react";
import { CompleteDataContext } from "../context/completeData";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Loader from "./loader";
import PieActiveArc from "./piechart";
import SimpleLineChart from "./linechartloan";
import { shadows } from '@mui/system';
import useLoanRequestSubscription from "../utils/realtime";








export default function AdminDashContent() {
  
  const { completeData } = useContext(CompleteDataContext);
  const [chartData, setChartData] = useState({ dates: [], loans: [] });



  useEffect(() => {
    const approvedData = completeData
      .filter((item) => item.status === "approved")
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


const isLoading = chartData.dates.length === 0 || chartData.loans.length === 0;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          margin:1,
          paddingX:3,
          gap:1
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              paddingX: { xs: 2 },
              height: "100%",
              marginY: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader size={50} />
          </Box>
        ) : (
          <>
            <Box sx={{ width: {xs:"90%",lg:"50%"}, paddingX: { xs: 2 } }}>
              <BarChart
                xAxis={[{ data: chartData.dates }]}
                series={[
                  {
                    data: chartData.loans,
                    label: "Approved Loan Amount by Dates",
                    itemStyle: (_, index) => ({
                      fill: index % 2 === 0 ? "#1976d2" : "#f44336", // Blue and Red
                    }),
                  },
                ]}
                height={290}
              />
            </Box>
            <Box sx={{width: {xs:"90%",lg:"50%"}, marginY: "5%", }}>
              <PieActiveArc />
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ margin:1}}>
        <SimpleLineChart />
      </Box>
    </>
  );
}
