import React, { useState, useRef, useEffect } from "react";
import snoopy from "../images/snoopy.jpg";
import ScatterPlot from "./Plots/Plots";
import PrimarySearchAppBar from "./Bars/Navbar";
import ClippedDrawer from "./Bars/SideBar";
import { ContactForm } from "./Forms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid'
function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <Typography
        margin="10px"
        variant="h5"
        noWrap
        component="div"
        align="center"
      >
        hola from inside APP
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <ScatterPlot />
      </Grid>
    </>
  );
}

export default App;
