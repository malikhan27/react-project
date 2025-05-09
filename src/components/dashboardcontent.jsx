import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { supabase } from "../utils/config";
import React, { use } from "react";
import Loader from "./loader";
import SimpleCharts from "./bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useContext } from "react";
import { CompleteDataContext } from "../context/completeData";

export default function Dashboarddata() {
 const { completeData, fetchCompleteData } = useContext(CompleteDataContext);

  const [filteredData, setFilteredData] = React.useState([]);
  const [approvedData, setApprovedData] = React.useState([]);


  React.useEffect(() => {
  
    const pending = completeData.filter((item) => item.status === "pending");
    const approved = completeData.filter((item) => item.status === "approved");
  
    setFilteredData(pending);
    setApprovedData(approved);
  }, [completeData]);


 
 
  

  return (
    <Box
      sx={{
        marginTop: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: { xs: 2 },
        paddingBottom: 3,
        color: "#ffffff", // white text
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          sx={{
            backgroundColor: "#112240", // slightly lighter dark blue
            marginTop: 3,
            paddingX: { xs: 4, md: 4, lg: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)", // sky blue
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <AccessTimeIcon sx={{ fontSize: 50, color: "#38bdf8" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">PENDING LOANS</h4>
                <h2 className="fw-bold mt-3">
                  {!filteredData.length ? <Loader size = {15}/> : filteredData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#112240",
            marginTop: 3,
            paddingX: { xs: 4, md: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <CheckBoxIcon sx={{ fontSize: 52, color: "#38bdf8" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">APPROVED LOANS</h4>
                <h2 className="mt-3 fw-bolder">
                {!approvedData.length ? <Loader size = {15}/> : approvedData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#112240",
            marginTop: 3,
            paddingX: { xs: 4, md: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <TrendingUpIcon sx={{ fontSize: 50, color: "#38bdf8" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">TOTAL REQUEST</h4>
                <h2 className="mt-3 fw-bolder">
                  {!completeData.length ? <Loader size = {15}/> : completeData.length}
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#112240",
            marginTop: 3,
            paddingX: { xs: 4, md: 4 },
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(56, 189, 248, 0.4)",
            width: { xs: "75%", lg: "20%", xl: "20%" },
            color: "#ffffff",
          }}
        >
          <CardContent>
            <Box className="flex flex-col items-center gap-4 flex-wrap">
              <BarChartIcon sx={{ fontSize: 50, color: "#38bdf8" }} />
              <Box sx={{ whiteSpace: "wrap" }}>
                <h4 className="fw-bolder">TOTAL CUSTOMER</h4>
                <h2 className="mt-3">
                  <Loader size = {15}/>
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: "100%", paddingX: { xs: 2 }, marginY: 3 }}>
        <SimpleCharts pendingData={filteredData.length} totalData={completeData.length} approvedData={approvedData.length} />
      </Box>
    </Box>
  );
}
