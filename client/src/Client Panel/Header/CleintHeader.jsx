import { HomeOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CleintHeader = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar className="bg-white">
          <div className="flex justify-between items-center flex-grow-[1]">
            <div className="flex flex-col justify-start gap-[4px]">
              <img src="/favicon/GrowLOGO.png" />
            </div>
            <div className="flex justify-end items-center gap-[40px] font-thin">
              <Link className="text-black hover:text-sky-600" to='/client/dashboard'>DASHBOARD</Link>
              <Link className="text-black hover:text-sky-600" to='/client/projects'>YOUR PROJECTS</Link>
              <Link className="text-black hover:text-sky-600" to='/client/contact'>CONTACT US</Link>
              <Link className="text-black hover:text-sky-600" to='/login'>LOGOUT</Link>
              <Tooltip title='Profile' arrow placement="bottom" className="cursor-pointer">
                <Avatar>H</Avatar>
              </Tooltip>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CleintHeader;
