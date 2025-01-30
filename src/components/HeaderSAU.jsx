import React from "react";
import { Typography, Box } from "@mui/material";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import {Menu as MenuIcon} from '@mui/icons-material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
function HeaderSAU() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color:"#FFF005" }}
            >
              <Diversity3Icon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              My Friend - เพื่อนของฉัน
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default HeaderSAU;
