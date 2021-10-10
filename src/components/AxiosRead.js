import {useState} from "react"
import axios from "axios";
import React from "react";


  const  sendGetRequest = async (djangoApiUrl) => {
    if(true){
    try {
      const datos = await axios.get(djangoApiUrl);
      console.log("datos right after axios:",datos);
      // const datosArray = datos.data.results;
      const datosArray = datos.data.results
      datosArray.forEach(d => {
        d.value = +d.value;
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
    return null
  }
  };

  export default sendGetRequest