import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, AppBar, Tabs, Tab, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import {useSession } from "../../../SessionContext";
function Cover() {
  const {setRole} = useSession()
  const navigate = useNavigate();
  sessionStorage.removeItem("user");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
   
    let login;
    if(tabValue==0) {
      login="Student"
    }
    if(tabValue==1) {
      login="Alumni"
    }
    if(tabValue==2) {
      login="Staff"
    }
    const response = await fetch("http://localhost:5001" + `/login${login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    setRole(body.role);
    if (body.message=="success") {
      sessionStorage.setItem("user", JSON.stringify(body.user));
      
      navigate("/dashboard");
    }else{
      console.error("Error:", body);
      alert(body.error);
    }
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={4} px={4}>
            <MDBox component="form" onSubmit={handleLogin} role="form">
              <AppBar position="static">
                <Tabs
                  textColor="info"
                  orientation={"horizontal"}
                  value={tabValue}
                  onChange={handleSetTabValue}
                >
                  <Tab
                    label="STUDENT"
                    icon={
                      <Icon
                        fontSize="small"
                        style={{ fontSize: "100px" }}
                        sx={{ mt: -0.25 }}
                      >
                        school_icon
                      </Icon>
                    }
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  />
                  <Tab
                    label="ALUMNI"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        engineering_icon
                      </Icon>
                    }
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  />
                  <Tab
                    label="STAFF"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        psychology_outlined_icon
                      </Icon>
                    }
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  />
                </Tabs>
              </AppBar>

              <MDBox mt={2} mb={2}>
                <MDInput
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  autoComplete="password"
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  type="submit"
                  color="info"
                  fullWidth
                >
                  sign in
                </MDButton>
              </MDBox>
            </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
