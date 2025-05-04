import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { supabase } from "../utils/config";
import React from "react";
import Loader from "./loader";
import SimpleCharts from "./bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboarddata() {
  const [filteredData, setFilteredData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [approvedData, setApprovedData] = React.useState([]);

  async function getData() {
    try {
      const { data, error } = await supabase
        .from("loanRequest")
        .select()
        .eq("status", "pending");
      if (error) throw error;
      if (data) {
        setFilteredData(data);
        console.log(data);
      }
    } catch (error) {}
  }

  async function getAllData() {
    try {
      const { data: totaldata, error: totalerror } = await supabase
        .from("loanRequest")
        .select();
      if (totalerror) throw totalerror;
      if (totaldata) {
        setAllData(totaldata);
        console.log(totaldata);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    getData();
    getAllData();
  }, []);

  async function getApprovedData() {
    try {
      const { data: Approveddata, error } = await supabase
        .from("loanRequest")
        .select()
        .eq("status", "approved");
      if (error) throw error;
      if (Approveddata) {
        setApprovedData(Approveddata);
        console.log(Approveddata);
        
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    getApprovedData();
  }, []);
  

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
                  {!filteredData.length ? <Loader /> : filteredData.length}
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
                {!approvedData.length ? <Loader /> : approvedData.length}
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
                  {!allData.length ? <Loader /> : allData.length}
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
                  <Loader />
                </h2>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <SimpleCharts pendingData={filteredData.length} totalData={allData.length} approvedData={approvedData.length} />
      </Box>
    </Box>
  );
}
