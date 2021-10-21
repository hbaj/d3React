import React, { useState, useRef, useEffect } from "react";
import snoopy from "../images/snoopy.jpg";
import ScatterPlot from "./Plots/Plots";
import PrimarySearchAppBar from "./Bars/Navbar"
import ClippedDrawer from "./Bars/SideBar"
import {ContactForm} from "./Forms/form"
import Box from '@mui/material/Box'
function App() {


  return (
    <>
    <PrimarySearchAppBar/>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 5,
          m: 5,
          overflowY:'auto',
          maxWidth: 600,
        }}
      >
        <Box sx={{ p: 5, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
        <Box sx={{ p: 5, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}><ScatterPlot/></Box>
      </Box>
     
      <h1> hola from inside APP</h1>
     
    </>
  );
}

export default App;
