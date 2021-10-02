import Recipes from "./Recipes";
import snoopy from "../images/snoopy.jpg";
import AllPeople from "./quest";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { select } from "d3";

function App() {
  console.log(`1-initial data->:`, r);
  
  const [r, setR] = useState(5);
  const [flag, setFlag] = useState(0);
  var x = 'hola'
  console.log("2-initial data->:", r);


  useEffect(() => {
    console.log("1--inside useEffect function", r);
    // setR(100);
    setTimeout(() => {
      console.log('inside timeout function')
      setR(Math.random()*50)
    }, 3000);
    x = 'noHola'
    console.log("2--inside useEffect function", r);
    console.log(" xvalue inside useEffect function->:", x);
return ()=>{
  console.log('inside useEffect cleaning function')
 
}
  }, [flag]);

  console.log("3-initial data->:", r);
  console.log(" xvalue->:", x);
  console.log("flag =", flag);
  return (
    <React.Fragment>
      <svg>
        <circle cx="50" cy="50" r={r} />
      </svg>
      <br />
      <h1> hola from inside APP</h1>
      <button
        onClick={() => {
          setFlag(flag +1);
          console.log("buttonchange radius:", r);
        }}
      >
        Radius change
      </button>
    </React.Fragment>
  );
}

export default App;
