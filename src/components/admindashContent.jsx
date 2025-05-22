import { useState, useEffect, useContext } from "react";
import { CompleteDataContext } from "../context/completeData";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import Loader from "./loader";
import PieActiveArc from "./piechart";
import SimpleLineChart from "./linechartloan";
import CopilotData from "../utils/copilotreadable";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function AdminDashContent() {
  const { completeData, sessiondata } = useContext(CompleteDataContext);
  const [chartData, setChartData] = useState({ dates: [], loans: [] });

 useEffect(() => {
  const approvedData = completeData
    .filter((item) => item.status === "approved")
    .map((item) => ({
      dateStr: new Date(item.created_at).toISOString().split("T")[0],
      loan: Number(item.loanAmount), // ✅ Ensure it's a number
    }));

  const dateMap = {};

  approvedData.forEach(({ dateStr, loan }) => {
    if (dateMap[dateStr]) {
      dateMap[dateStr] += loan; // ✅ Now this adds numbers
    } else {
      dateMap[dateStr] = loan;
    }
  });

  const sortedDates = Object.keys(dateMap).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const formattedDates = sortedDates.map((dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const loans = sortedDates.map((date) => dateMap[date]);

  setChartData({ dates: formattedDates, loans });
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
          margin: 1,
          paddingX: 3,
          gap: 1,
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
            <Box sx={{ width: { xs: "90%", lg: "50%" }, paddingX: { xs: 2 } }}>
              <BarChart
                xAxis={[{ data: chartData.dates }]}
                series={[
                  {
                    data: chartData.loans,
                    label: "Approved Loan Amount by Dates",
                    itemStyle: (_, index) => ({
                      fill: index % 2 === 0 ? "#1976d2" : "#f44336",
                    }),
                  },
                ]}
                height={290}
              />
            </Box>
            <Box sx={{ width: { xs: "90%", lg: "50%" }, marginY: "5%" }}>
              <PieActiveArc />
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ margin: 1 }}>
        <SimpleLineChart />
      </Box>
        <CopilotData loanData={completeData} />
            <CopilotPopup
              key={sessiondata?.user?.id}
              instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
              labels={{
                title: "Popup Assistant",
                initial: "Hi! 👋 How can I assist you today?",
              }}
          />
    </>
  );
}
