import React, { useState, useRef, useEffect } from "react";
import snoopy from "../images/snoopy.jpg";
import ScatterPlot from "./Plots/Plots";
import PrimarySearchAppBar from "./Bars/Navbar";
import SideBar from "./Bars/SideBar";
import ClippedDrawer from "./Bars/SideBar";
import Table from "./Tables/Table";

import { ContactForm } from "./Forms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import HomeButton from "./Buttons/HomeButton";

function PcCheck() {
  return (
    <>
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
  return (
    <>
      <h1> inside homepage</h1>
      <Link to="/pc-check" className="link">
        {" "}
        PC-check{" "}
      </Link>

      <Link to="/ppid" className="link">
        recipes
      </Link>
    </>
  );
}

function NotFoundPage() {
  return <div className="page">🧐 Page</div>;
}

function Ppid() {
  return(
  <>
    <div className="page">🍎 Recipes</div>
    <Table/>
  </>);
}
function App() {
  return (
    <Router>
      {/* <SideBar/> */}
      <PrimarySearchAppBar />

      <HomeButton />

      <div></div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/pc-check" element={<PcCheck />} />
        <Route path="/ppid" element={<Ppid />} />
        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
