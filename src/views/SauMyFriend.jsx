import React from "react";
import HeaderSAU from "../components/HeaderSAU";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logoSAU1 from "./../assets/images/logo.png";
import logoSAU2 from "./../assets/images/logo2.png";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paper } from "@mui/material";

function SauMyFriend() {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleDeleteClick = async (myfriendId) => {
    try {
      const response = await fetch(
        "http://localhost:3030/myfriend/delete/" + myfriendId,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        alert("ลบข้อมูลเรียบร้อย");
        window.location.href = "/myfriend";
      } else {
        alert("ลบข้อมูลไม่สําเร็จ");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการลบข้อมูล" + error);
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h7" sx={{ color: "#233C8A" }}>
              <b> My Friend</b>
            </Typography>
            <Link to="/addmyfriend">
              <Button variant="contained" sx={{ py: 2 }}>
                Add Friend
              </Button>
            </Link>
          </Box>
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#ADADAD" }}>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Friend Phone</TableCell>
                  <TableCell align="center">Friend Age</TableCell>
                  <TableCell align="center">Friend Major</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow
                    key={row.myfriendId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {user.indexOf(row) + 1}
                    </TableCell>
                    <TableCell align="center">{row.myfriendFullname}</TableCell>
                    <TableCell align="center">{row.myfriendPhone}</TableCell>
                    <TableCell align="center">{row.myfriendAge}</TableCell>
                    <TableCell align="center">{row.myfriendMajor}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={"/updatemyfriend/" + row.myfriendId}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleDeleteClick(row.myfriendId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default SauMyFriend;
