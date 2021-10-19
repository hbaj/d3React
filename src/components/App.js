import React, { useState, useRef, useEffect } from "react";
import snoopy from "../images/snoopy.jpg";
import ScatterPlot from "./Plots/Plots";
import {ContactForm} from "./Forms/form"
function App() {


  return (
    <>
      <ContactForm/>
      <ScatterPlot/>
      <ScatterPlot/>
      <ScatterPlot/>
      <ScatterPlot/>
      <h1> hola from inside APP</h1>
     
    </>
  );
}

export default App;
