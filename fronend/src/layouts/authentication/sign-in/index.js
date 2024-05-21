
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import {useSession } from "../../../SessionContext";

function Basic() {

  const {setRole} = useSession()
  const navigate = useNavigate();
  sessionStorage.removeItem("user");
    const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // console.log(data)  
    const response = await fetch("http://localhost:5001" + `/poLogin`, {
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
      
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Placement Office
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            LOGIN
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={handleLogin} role="form">
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
    </BasicLayout>
  );
}

export default Basic;

