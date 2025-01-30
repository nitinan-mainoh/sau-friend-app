import React from "react";
import HeaderSAU from "../components/HeaderSAU";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoSAU1 from "./../assets/images/logo.png";
import logoSAU2 from "./../assets/images/logo2.png";

function SauLogin() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (userName === "" && userPassword === "") {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
    } else {
      try {
        const response = await fetch(
          "http://localhost:3030/user/login/" + userName + "/" + userPassword,
          {
            method: "GET",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data["data"]));
          window.location.href = "/myfriend";
        } else {
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ" + error);
      }
    }
  };
  return (
    <>
      <HeaderSAU />
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box
          sx={{
            width: "60%",
            boxShadow: 5,
            borderRadius: 2,
            border: "1px solid #CCCCCC",
            my: 2,
            p: 3,
            flexDirection: "column", // จัดเรียงแนวตั้ง
            mt: 10,
            mb: 10,
            pt: 5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ width: "5%" }} />
            <Box
              component="img"
              sx={{
                width: 120,
                height: 120,
                borderRadius: "0px", // Rounded corners
                boxShadow: 5, // Shadow
              }}
              alt="SAU Logo1"
              src={logoSAU1}
            />
            <Box
              component="img"
              sx={{
                width: 120,
                height: 120,
                border: "2px solid #FFFFFF",
                borderRadius: "50px",
                boxShadow: 3,
              }}
              alt="SAU Logo2"
              src="https://webapp.sau.ac.th/cv-scholarship/Images/sau_logo.png"
            />

            <Box
              component="img"
              sx={{
                width: 120,
                height: 120,
                border: "2px solid #FFFFFF",
                borderRadius: "10px",
                boxShadow: 5,
              }}
              alt="SAU Logo3"
              src={logoSAU2}
            />
            <Box sx={{ width: "5%" }} />
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center", my: 5 }}>
            Welcome to SAU - Friend
          </Typography>
          <Typography variant="h7">User Name</Typography>
          <TextField
            id="userName"
            variant="outlined"
            placeholder="Username *"
            fullWidth
            sx={{ my: 2 }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Typography variant="h7">Password</Typography>
          <TextField
            id="userPassword"
            variant="outlined"
            placeholder="Password *"
            fullWidth
            type="password"
            sx={{ my: 2 }}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 2, py: 2 }}
            onClick={handleLoginClick}
          >
            Sign in
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h7">
              Don't have an account ? &nbsp;
              <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SauLogin;
