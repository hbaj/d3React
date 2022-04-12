import React, { useState, useRef, useEffect } from "react";
import snoopy from "../images/snoopy.jpg";
import ScatterPlot from "./Plots/Plots";
import PrimarySearchAppBar from "./Bars/Navbar";
import ClippedDrawer from "./Bars/SideBar";
import { ContactForm } from "./Forms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

function PcCheck() {
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
        <ScatterPlot />
      </Grid>
    </>
  );
}
function HomePage() {
  return <div className="page">🏠 Page</div>;
}

function NotFoundPage() {
  return <div className="page">🧐 Page</div>;
}

function ApplePage() {
  return <div className="page">🍎 Page</div>;
}
function App() {
  return (
    <Router>
    <div>
      <Link to="/" className="link">
        Home
      </Link>

      <Link to="/pc-check" className="link">
        Apple
      </Link>
      <Link to="/applet" className="link">
        Applet
      </Link>
      <Link to="/test" className="link">
        Test
      </Link>
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pc-check" element={<PcCheck />} />
      <Route path="/apple" element={<ApplePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  </Router>
  );
}

export default App;
