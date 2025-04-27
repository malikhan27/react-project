import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { supabase } from "../utils/config";
import React, { use } from "react";
import Loader from "./loader";
import SimpleCharts from "./bar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Dashboarddata() {
  const [filteredData, setFilteredData] = React.useState([]);
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
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{
        marginTop: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "space-around",
        justifyContent: "space-between",
        flexDirection: "column",
        paddingX: { xs: 2}
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
      
        }}
      >
        <Card
          variant="solid"
          sx={{
            backgroundColor: "#f1befa",
            marginTop: 3,
            paddingX: {xs:4,md:4,lg:4},
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgba(71, 8, 68, 0.69)",
            width: { xs: "75%", lg: "20%" , xl: "20%"}
          }}
        >
          <CardContent>
            <div
              style={{ color: "#380940" }}
              className="flex flex-col items-center  gap-4 flex-wrap"
            >
              <AccessTimeIcon sx={{ fontSize: 50 }} />
              <div>
                <h4 className=" fw-bolder">PENDING REQUEST</h4>
                <h2 className=" fw-bold mt-3">
                  {!filteredData.length ? <Loader /> : filteredData.length}
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="solid"
          sx={{
            backgroundColor: "#f1befa",
            marginTop: 3,
            paddingX: {xs:4,md:4},
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgb(71, 8, 68)",
            width: { xs: "75%", lg: "20%" , xl: "20%"}
          }}
        >
          <CardContent>
            <div
              style={{ color: "#380940" }}
              className="flex flex-col items-center gap-4  flex-wrap"
            >
              <CheckBoxIcon sx={{ fontSize: 52 }} />
              <div>
                <h4 className=" fw-bolder">APPROVED LOANS</h4>
                <p className=" mt-3">
                  <Loader />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          variant="solid"
          sx={{
            backgroundColor: "#f1befa",
            marginTop: 3,
            paddingX: {xs:4,md:4},
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgb(71, 8, 68)",
            width: { xs: "75%", lg: "20%" , xl: "20%"}
          }}
        >
          <CardContent>
            <div
              style={{ color: "#380940" }}
              className="flex flex-col items-center gap-4  flex-wrap"
            >
              <TrendingUpIcon sx={{ fontSize: 50 }} />
              <div className="">
                <h4 className="fw-bolder">TOTAL REQUEST</h4>
                <p className=" mt-3">
                  <Loader />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="solid"
          sx={{
            backgroundColor: "#f1befa",
            marginTop: 3,
            paddingX: {xs:4,md:4},
            paddingY: 1,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0px 0px 8px rgb(71, 8, 68)",
            width: { xs: "75%", lg: "20%" , xl: "20%"}
          }}
        >
          <CardContent>
            <div
              sx={{ color: "#380940" }}
              className="flex flex-col items-center gap-4  flex-wrap"
            >
              <BarChartIcon sx={{ fontSize: 50 }} />
              <div className="">
                <h4 className=" fw-bolder">TOTAL CUSTOMER</h4>
                <p className=" mt-3">
                  <Loader />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
       <Box sx={{marginBottom: 3 , marginTop: 3}}>
       <SimpleCharts pendingData={filteredData.length} />
      </Box>
    </Box>
  );
}
