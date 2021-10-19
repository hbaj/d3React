import {
    min,
    max,
    extent,
  } from "d3";
  
   const  CalculateUniqueProperties = (data) => {
    const legend = new Set(data);
    console.log('datos inide legend function:',legend)
    return legend;
  }
  export  default CalculateUniqueProperties;