import Recipes from "./Recipes";
import snoopy from "../images/snoopy.jpg";
import AllPeople from "./quest";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { select, scaleLinear, scaleTime, timeParse,axisLeft, axisBottom, min, max, extent } from "d3";

function App() {
  console.log(`1-initial data->:`, r);

  const [r, setR] = useState(null);
  const [flag, setFlag] = useState(0);
  const svgRef = useRef();
  // var x = "hola";
  const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";

  function props() {
    let width = document.body.clientWidth-100;
    let height = document.body.clientHeight-200;
    let margin = { top: 30, bottom: 100, left: 100, right: 30 };
    let tickSeparationRatio = 70;
    return {
      width: width,
      height: height,
      margin: margin,
      tickSeparationRatio: tickSeparationRatio,
    };
  }

  console.log("2-initial data->:", r);

  const sendGetRequest = async () => {
    try {
      const datos = await axios.get(djangoApiUrl);

      // console.log("datos after promise completion:", datos);
      // const datosArray = datos.data.results;
      const datosArray = datos.data.results
      datosArray.forEach(d => {
        d.value = +d.value;
        d.date = new Date(d.date);
      });
      // const datosArray = datos_.map((d) => +d.value * Math.random());
      console.log("array fixed from axios:", datosArray);
      setR(datosArray);
      console.log(
        "***************Axios request complete - Updating state :",
        datosArray
      );

      // console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  function calculateAxisProperties(axisData) {
    let b = min(axisData);
    let c = max(axisData);
    let d = extent(axisData);
    return [b, c, d];
  }

  useEffect(() => {
    console.log("1--inside useEffect function", r);
    const { width, height, margin, tickSeparationRatio } = props();
    
    console.log("screen props useEffect function", width, height, margin.bottom,height - margin.bottom);
    sendGetRequest();
    // x = "noHola";
    console.log("AXIOS DATA--inside useEffect function", r);
    // console.log(" xvalue inside useEffect function->:", x);
    if (!r) {
      console.log("inside !r check");
      return null;
    }
    // const parseDate = timeParse('%Y-%m-%d %H:%M:%S')
    const xAxisProps = calculateAxisProperties(r.map((d) => d.date));
    
    const yAxisProps = calculateAxisProperties(r.map((d) => d.value));
    console.log(xAxisProps, "\n", yAxisProps);
    const svg = select(svgRef.current)
      .attr("width", width-margin.left)
      .attr("height", height-margin.top)
      .style("background-color", "green")
      .selectAll("g")
      .data([0])
      .join("g")
      .attr("class", "g-margin-plot")
      .attr("transform", "translate(" + margin.left + " " + margin.top + ")")
      .style("background-color", "purple");

    console.log("x properties: ", xAxisProps);

    // ########### x axis setup ############
    var xmin = new Date(xAxisProps[0] );
    var xmax = new Date(xAxisProps[1] );
    xmin.toDateString();
    xmax.toDateString();
    const xScale = scaleTime()

   /* enter data to modify y scale   */
      .range([0, width-margin.right-250])
      // .range([+yAxisProps.max,+yAxisProps.min])
      .domain([xmin, xmax]);
 
    const xAxis = axisBottom(xScale)
    // .ticks(
    //   (height - margin.top) / tickSeparationRatio
    // );
    let xAxisG = svg.selectAll(".g-margin-plot")
                    .data([0])
                    .join('g')
                    .attr("transform", "translate(0 " + (height - margin.bottom).toString() + ")")
                    .call(xAxis)
                    ;

    // ########### y axis setup ############
    const yScale = scaleLinear()
   /* enter data to modify y scale   */
      .range([height-margin.bottom, 90])
      // .range([+yAxisProps.max,+yAxisProps.min])
      .domain([0, yAxisProps[1]]);
      // .domain([0, +yAxisProps.max]);

      console.log('yScale:',yScale)
    const yAxis = axisLeft(yScale)
    // .ticks(
    //   (height - margin.top) / tickSeparationRatio
    // );
    let yAxisG = svg.selectAll(".g-margin-plot")
                    .data([0])
                    .join('g')
                    // .attr("transform", "translate(0 " + '20' + ")")
                    .call(yAxis)
                    ;


    svg
      .selectAll("circle")
      .data(r)
      .join(
        (enter) => enter.append("circle").attr("class", "new"),
        (update) => update.attr("class", "udpated"),
        (exit) => exit.remove()
      )
      .attr("r", 10)
      .attr("cx", (r) => xScale(r.date))
      .attr("cy", (r) => yScale(r.value))
      .attr("stroke", "red");

    return () => {
      console.log("inside useEffect cleaning function");
    };
  }, [flag]);

  // console.log("3-initial data->:", r);
  // console.log(" xvalue->:", x);
  // console.log("flag =", flag);
  // console.log("incoming  svgREf processing ", svgRef.current);
  // // const xValueCount = r.length;
  // // console.log("rango  x", [...Array(xValueCount).keys()]);

  // // // ########### y axis setup ############
  // // const yScale = scaleLinear()
  // //   .domain([0, 1]) /* enter data to modify y scale   */
  // //   .range([screen_props.innerHeight, 0]);
  // // const yAxis = axisLeft(yScale).ticks(screen_props.innerHeight / screen_props.tickSeparationRatio);
  // // let yAxisG = g.selectAll(".y-axis").data([null]);
  // // yAxisG = yAxisG
  // //   .join("g")
  // //   .attr("class", "y-axis") /* enter data to modify y scale Name   */
  // //   .merge(yAxisG);
  // // yAxisG.call(yAxis);

  // const svg = select(svgRef.current)
  //   .attr("width", 500)
  //   .attr("height", 400)
  //   .style("background-color", "green")
  //   .selectAll('g')
  //   .data([0])
  //   .join('g')
  // .attr("transform", "translate(50 20)")
  // .style('background-color','purple')

  // console.log("incoming datos to svg processing ", r);

  // svg
  //   .selectAll("circle")
  //   .data(r)
  //   .join(
  //     (enter) => enter.append("circle").attr("class", "new"),
  //     (update) => update.attr("class", "udpated"),
  //     (exit) => exit.remove()
  //   )
  //   .attr("r", r => r.value)
  //   .attr("cx", r => +r.value * Math.random())
  //   .attr("cy", r => r.value)
  //   .attr("stroke", "red");

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
