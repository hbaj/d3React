import Recipes from "./Recipes";
import snoopy from "../images/snoopy.jpg";
import AllPeople from "./quest";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { select, scaleLinear, axisLeft } from "d3";

function App() {
  console.log(`1-initial data->:`, r);

  const [r, setR] = useState([5]);
  const [flag, setFlag] = useState(0);
  const svgRef = useRef();
  var x = "hola";
  const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";

  const screen_props = {
    width: document.body.clientWidth - 50,
    height: document.body.clientHeight - 200,
    margin: { top: 30, bottom: 100, left: 100, right: 30 },
    tickSeparationRatio: 70,
  };

  console.log("2-initial data->:", r);

  const sendGetRequest = async () => {
    try {
      const datos = await axios.get(djangoApiUrl);

      console.log("datos after promise completion:", datos);
      const datosArray = datos.data.results;
      // const datosArray = datos_.map((d) => +d.value * Math.random());
      console.log("array fixed from axios:", datosArray);
      setR(datosArray);
      console.log("updating state:", datosArray);

      // console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("1--inside useEffect function", r);
    // setR(100);

    sendGetRequest();
    //   setTimeout(() => {
    //     console.log('inside timeout function')
    //     setR(Math.random()*50)
    //   }, 3000);
    x = "noHola";
    console.log("2--inside useEffect function", r);
    console.log(" xvalue inside useEffect function->:", x);
    return () => {
      console.log("inside useEffect cleaning function");
    };
  }, [flag]);

  console.log("3-initial data->:", r);
  console.log(" xvalue->:", x);
  console.log("flag =", flag);
  console.log("incoming  svgREf processing ", svgRef.current);
  // const xValueCount = r.length;
  // console.log("rango  x", [...Array(xValueCount).keys()]);

  // // ########### y axis setup ############
  // const yScale = scaleLinear()
  //   .domain([0, 1]) /* enter data to modify y scale   */
  //   .range([screen_props.innerHeight, 0]);
  // const yAxis = axisLeft(yScale).ticks(screen_props.innerHeight / screen_props.tickSeparationRatio);
  // let yAxisG = g.selectAll(".y-axis").data([null]);
  // yAxisG = yAxisG
  //   .join("g")
  //   .attr("class", "y-axis") /* enter data to modify y scale Name   */
  //   .merge(yAxisG);
  // yAxisG.call(yAxis);

  const svg = select(svgRef.current)
    .attr("width", 500)
    .attr("height", 400)
    .style("background-color", "green")
    .selectAll('g')
    .data([0])
    .join('g')
  .attr("transform", "translate(200 130)")
  .style('background-color','purple')

  console.log("incoming datos to svg processing ", r);
  console.log(
    "value col passing to d3 as datos",
    r.map((d) => d.value)
  );
  svg
    .selectAll("circle")
    .data(r)
    .join(
      (enter) => enter.append("circle").attr("class", "new"),
      (update) => update.attr("class", "udpated"),
      (exit) => exit.remove()
    )
    .attr("r", (value) => 20)
    .attr("cx", (r) => +r.value * Math.random())
    .attr("cy", (value) => 200)
    .attr("stroke", "red");

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <h1> hola from inside APP</h1>
      <button
        onClick={() => {
          setFlag(flag + 1);
          console.log("buttonchange radius:", r);
        }}
      >
        Radius change
      </button>
    </React.Fragment>
  );
}

export default App;
