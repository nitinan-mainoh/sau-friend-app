import React from "react";
import HeaderSAU from "../components/HeaderSAU";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logoSAU1 from "./../assets/images/logo.png";
import logoSAU2 from "./../assets/images/logo2.png";
import { useEffect, useState } from "react";

function SauAddMyFriend() {
  const [myfriendFullname, setMyfriendFullname] = useState("");
  const [myfriendPhone, setMyfriendPhone] = useState("");
  const [myfriendAge, setMyfriendAge] = useState("");
  const [myfriendMajor, setMyfriendMajor] = useState("");
  //--------------------------------------------------
  const [userId, setUserId] = useState("");
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  //สร้าง state สําหรับเก็บข้อมูลเพื่อนของ user
  const [user, setUser] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.userId);
      setUserFullname(user.userFullname);
      setUserEmail(user.userEmail);
      setUserName(user.userName);

      try {
        const fetchData = async () => {
          const response = await fetch(
            "http://localhost:3030/myfriend/getByUserId/" + user.userId,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // ตรวจสอบค่าที่ได้จาก API
          if (response.status === 200) {
            const data = await response.json();
            setUser(data["data"]);
          }
        };

        fetchData();
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (
      myfriendFullname === "" &&
      myfriendPhone === "" &&
      myfriendAge === "" &&
      myfriendMajor === ""
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      try {
        const response = await fetch("http://localhost:3030/myfriend/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            myfriendFullname: myfriendFullname,
            myfriendPhone: myfriendPhone,
            myfriendAge: myfriendAge,
            myfriendMajor: myfriendMajor,
            userId: userId,
          }),
        });
        if (response.status === 201) {
          alert("บันทึกข้อมูลเรียบร้อย");
          window.location.href = "/myfriend";
        } else {
          alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    // อาจารย์ไม่ได้กำหนด Action ของปุ่ม Cancel มา ****
    // กำหนดให้ปุ่ม Cancel ทำการล้างข้อมูลออกจาก TextField
    setMyfriendFullname("");
    setMyfriendPhone("");
    setMyfriendAge("");
    setMyfriendMajor("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
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
            sx={{ textAlign: "center", mt: 7, color: "#233C8A" }}
          >
            <b>Hi... {userFullname} </b>
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="" sx={{ color: "red" }} onClick={handleLogout}>
              [Sign Out]
            </Button>
            <Typography variant="h5" sx={{ color: "#233C8A", my: 3 }}>
              <b>เพิ่มเพื่อน</b>
            </Typography>
          </Box>
          <Typography variant="h7">Name</Typography>
          <TextField
            id="myfriendFullname"
            variant="outlined"
            placeholder="Input First Name and Last Name"
            fullWidth
            sx={{ my: 2 }}
            value={myfriendFullname}
            onChange={(e) => setMyfriendFullname(e.target.value)}
          />
          <Typography variant="h7">Telephone</Typography>
          <TextField
            id="myfriendPhone"
            variant="outlined"
            placeholder="Input Telephone"
            fullWidth
            sx={{ my: 2 }}
            value={myfriendPhone}
            onChange={(e) => setMyfriendPhone(e.target.value)}
          />
          <Typography variant="h7">Age</Typography>
          <TextField
            id="myfriendAge"
            variant="outlined"
            placeholder="Input Age"
            fullWidth
            sx={{ my: 2 }}
            value={myfriendAge}
            onChange={(e) => setMyfriendAge(e.target.value)}
          />
          <Typography variant="h7">Major</Typography>
          <TextField
            id="myfriendMajor"
            variant="outlined"
            placeholder="Input Major"
            fullWidth
            sx={{ my: 2 }}
            value={myfriendMajor}
            onChange={(e) => setMyfriendMajor(e.target.value)}
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
          <Link to="/myfriend">
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2, my: 2, bgcolor: "green" }}
            >
              Go to My Friend
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SauAddMyFriend;
