import Recipes from "./Recipes";
import snoopy from "../images/snoopy.jpg";
import sendGetRequest from "./AxiosRead";
import React, { useState, useRef, useEffect } from "react";
import {
  select,
  scaleLinear,
  scaleTime,
  timeParse,
  axisLeft,
  axisBottom,
  min,
  max,
  extent,
} from "d3";

function App() {
  //console.log(`1-initial data->:`, r);

  const [r, setR] = useState(null);
  const [flag, setFlag] = useState(0);
  const svgRef = useRef();
  // var x = "hola";
  const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";

  function props() {
    let width = 600; //document.body.clientWidth-100;
    let height = 300; //document.body.clientHeight-200;
    let margin = { top: 30, bottom: 100, left: 100, right: 30 };
    let tickSeparationRatio = 70;
    return {
      width: width,
      height: height,
      margin: margin,
      tickSeparationRatio: tickSeparationRatio,
    };
  }

  //console.log("2-initial data->:", r);

  // const sendGetRequest = async () => {
  //   try {
  //     const datos = await axios.get(djangoApiUrl);

  //     // //console.log("datos after promise completion:", datos);
  //     // const datosArray = datos.data.results;
  //     const datosArray = datos.data.results
  //     datosArray.forEach(d => {
  //       d.value = +d.value;
  //       d.date = new Date(d.date);
  //     });
  //     // const datosArray = datos_.map((d) => +d.value * Math.random());
  //     //console.log("array fixed from axios:", datosArray);
  //     setR(datosArray);
  //     //console.log(
  //       "***************Axios request complete - Updating state :",
  //       datosArray
  //     );

  //     // //console.log(resp.data);
  //   } catch (err) {
  //     // Handle Error Here
  //     //console.error(err);
  //   }
  // };

  function calculateAxisProperties(axisData) {
    let b = min(axisData);
    let c = max(axisData);
    let d = extent(axisData);
    return [b, c, d];
  }

  useEffect(() => {
    console.log("1--inside useEffect function", r);
    const { width, height, margin, tickSeparationRatio } = props();

    //console.log("screen props useEffect function", width, height, margin.bottom,height - margin.bottom);
    const axiosDatos = sendGetRequest(djangoApiUrl); //.then(d => //console.log('comeback to APP from axios query',d));
    //console.log("***************array fixed from axios:", axiosDatos);

    // x = "noHola";
    axiosDatos.then(res => setR(res));
    console.log("  inside useEffect function->r:", r, "type of r:", typeof r);
    console.log(
      "  inside useEffect function->axiosDatos:",
      axiosDatos,
      "type axiosDatos:",
      typeof axiosDatos
    );
    if (!r) {
      console.log("inside !r check");
      return null;
    }
    // //console.log("AXIOS DATA--inside useEffect function", datos_);
    //console.log("AXIOS DATA--inside useEffect function", r);
    // const parseDate = timeParse('%Y-%m-%d %H:%M:%S')
    const xAxisProps = calculateAxisProperties(r.map((d) => d.date));

    const yAxisProps = calculateAxisProperties(r.map((d) => d.value));
    //console.log(xAxisProps, "\n", yAxisProps);
    const svg = select(svgRef.current)
      .attr("width", width - margin.left)
      .attr("height", height - margin.top)
      .style("background-color", "green")
      .selectAll("g")
      .data([0])
      .join("g")
      .attr("class", "g-margin-plot")
      .attr("transform", "translate(" + margin.left + " " + margin.top + ")")
      .style("background-color", "purple");

    //console.log("x properties: ", xAxisProps);

    // ########### x axis setup ############
    var xmin = new Date(xAxisProps[0]);
    var xmax = new Date(xAxisProps[1]);
    xmin.toDateString();
    xmax.toDateString();
    const xScale = scaleTime()
      /* enter data to modify y scale   */
      .range([0, width - margin.right - 250])
      // .range([+yAxisProps.max,+yAxisProps.min])
      .domain([xmin, xmax])
      .nice();

    const xAxis = axisBottom(xScale);
    // .ticks(
    //   (height - margin.top) / tickSeparationRatio
    // );
    let xAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      .attr(
        "transform",
        "translate(0 " + (height - margin.bottom).toString() + ")"
      )
      .call(xAxis);
    // ########### y axis setup ############
    const yScale = scaleLinear()
      /* enter data to modify y scale   */
      .range([height - margin.bottom, 90])
      // .range([+yAxisProps.max,+yAxisProps.min])
      .domain([0, yAxisProps[1]])
      .nice();
    // .domain([0, +yAxisProps.max]);

    //console.log('yScale:',yScale)
    const yAxis = axisLeft(yScale);
    // .ticks(
    //   (height - margin.top) / tickSeparationRatio
    // );
    let yAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      // .attr("transform", "translate(0 " + '20' + ")")
      .call(yAxis);
    // ########### legend setup ############
    const legendData = [...new Set(r.map((d) => d.variable))];
    //console.log('legend data', legendData)

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
      //console.log("inside useEffect cleaning function");
    };
  }, [flag]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <h1> hola from inside APP</h1>
      <button
        onClick={() => {
          setFlag(flag + 1);
          //console.log("buttonchange radius:", r);
        }}
      >
        Radius change
      </button>
    </React.Fragment>
  );
}

export default App;
