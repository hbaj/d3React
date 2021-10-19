import {useState} from "react"
import axios from "axios";
import React from "react";


  const  sendGetRequest = async (djangoApiUrl,r) => {
    if(r!==null){
    try {
      const datos = await axios.get(djangoApiUrl);
      // console.log("datos right after axios:",datos);
      // const datosArray = datos.data.results;
      const datosArray = datos.data.results
      datosArray.forEach(d => {
        d.value = +d.value * Math.random();
        d.date = new Date(d.date);
      });
     

      console.log("***************Axios request complete - Updating state :", datosArray);
      return(datosArray)
      ;

    } catch (err) {
      // Handle Error Here
      console.error(err);
      // return err
    }
  }
  else {
    return [0]
  }
  };

  export default sendGetRequest