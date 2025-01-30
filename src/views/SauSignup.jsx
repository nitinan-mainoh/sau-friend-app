import React from "react";
import HeaderSAU from "../components/HeaderSAU";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoSAU1 from "./../assets/images/logo.png";
import logoSAU2 from "./../assets/images/logo2.png";

function SauSignup() {
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (  
      userFullname === "" &&
      userEmail === "" &&
      userName === "" &&
      userPassword === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      try {
        const response = await fetch("http://localhost:3030/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userFullname: userFullname,
            userEmail: userEmail,
            userName: userName,
            userPassword: userPassword,
          }),
        });
        if (response.status === 201) {
          alert("ลงทะเบียนสําเร็จ");
          window.location.href = "/";
        } else {
          alert("เกิดข้อผิดพลาดในการลงทะเบียน");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลงทะเบียน" + error);
      }
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // อาจารย์ไม่ได้กำหนด Action ของปุ่ม Cancel มา ****
    // กำหนดให้ปุ่ม Cancel ทำการล้างข้อมูลออกจาก TextField
    setUserFullname("");
    setUserEmail("");
    setUserName("");
    setUserPassword("");
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

          <Typography
            variant="h5"
            sx={{ textAlign: "center", my: 5, color: "#233C8A" }}
          >
            <b>Sign up</b>
          </Typography>
          <Typography variant="h7">ชื่อ - สกุล</Typography>
          <TextField
            id="userFullname"
            variant="outlined"
            placeholder="First/Last name *"
            fullWidth
            sx={{ my: 2 }}
            value={userFullname}
            onChange={(e) => setUserFullname(e.target.value)}
          />
          <Typography variant="h7">อีเมล์</Typography>
          <TextField
            id="userEmail"
            variant="outlined"
            placeholder="Email *"
            fullWidth
            type="email"
            sx={{ my: 2 }}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Typography variant="h7">ชื่อผู้ใช้</Typography>
          <TextField
            id="userName"
            variant="outlined"
            placeholder="Username *"
            fullWidth
            sx={{ my: 2 }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Typography variant="h7">รหัสผ่าน</Typography>
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2, mr: 1 }}
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2, ml: 1, bgcolor: "red" }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Box>
          <Link to="/">
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2, my: 2, bgcolor: "green" }}
            >
              Back to Sign In
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SauSignup;
