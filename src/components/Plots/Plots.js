import React, { useState, useRef, useEffect } from "react";
import {
  select,
  scaleLinear,
  scaleTime,
  timeParse,
  timeFormat,
  axisLeft,
  axisBottom,
  min,
  max,
  extent,
  timeHour,
} from "d3";
import sendGetRequest from "../AxiosRead";
import PropCharts from "./PropsChart";
import CalculateChartProperties from "./CalculateChartProperties";
// import { DelegatedPlugin } from "webpack";


const ScatterPlot = () => {
  
  const [r, setR] = useState(null);
  const [flag, setFlag] = useState(0);
  const svgRef = useRef();
  const { width, height, margin, tickSeparationRatio } = PropCharts();

  const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";
  useEffect(() => {
    console.log("1 @@@@@ inside Plot.js useEffect function", r);
    const { width, height, margin, tickSeparationRatio } = PropCharts();
    console.log('flag:', flag);
    // const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";
    const axiosDatos = sendGetRequest(djangoApiUrl); 
    axiosDatos.then(res => setR(res));
    console.log('inside Plots.js r:', r)
    if (!r) {
      console.log("inside !r  Plots.js check");
      return <h1>loading...</h1>;
    }
    // const formatTime = timeFormat('%Y-%m-%d %H:%M:%S')
    const formatTime = timeFormat('%y/%m/%d');
    const xAxisProps = CalculateChartProperties(r.map((d) => d.date));

    const yAxisProps = CalculateChartProperties(r.map((d) => d.value));
    //const legendData = legends(r.map(d => d.))
    const svg = select(svgRef.current)
      .attr("width", width - margin.left)
      .attr("height", height - margin.top)
      .style("background-color", "yellow")
      .selectAll("g")
      .data([0])
      .join("g")
      .attr("class", "g-margin-plot")
      .attr("transform", "translate(" + margin.left + " " + margin.top + ")")
      .style("background-color", "purple");

    // ########### x axis setup ############
    var xmin = new Date(xAxisProps[0]);
    var xmax = new Date(xAxisProps[1]);
    console.log('---->',xmin, typeof xmin);

    xmin.toDateString();
    xmax.toDateString();
    var deltaX = timeHour.count(xmin,xmax);
    // console.log('======>',xmin);
    const xScale = scaleTime()
      /* enter data to modify y scale   */
      .range([0, width - margin.right - 250])
      .domain([xmin, xmax])
      .nice();

    const xAxis = axisBottom(xScale)
    .ticks(
      deltaX/tickSeparationRatio
    );
    let xAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      .attr(
        "transform",
        "translate(0 " + (height - margin.bottom).toString() + ")"
      )
      .call(xAxis)
      .selectAll("text")     // here down will fix all thick mark orientations
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-35)");
    // ########### y axis setup ############
    const yScale = scaleLinear()
      /* enter data to modify y scale   */
      .range([height - margin.bottom, margin.top])
      .domain([0, yAxisProps[1]])
      .nice();

    const yAxis = axisLeft(yScale)
    .ticks(
      (height - margin.top) / tickSeparationRatio
    );
    let yAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      // .attr("transform", "translate(0 " + '20' + ")")
      .call(yAxis);
    // ########### legend setup ############
    const legendData = [...new Set(r.map((d) => d.variable))];

    svg
      .selectAll("circle")
      .data(r)
      .join(
        (enter) => enter.append("circle").attr("class", "new"),
        (update) => update.attr("class", "udpated"),
        (exit) => exit.remove()
      )
      .attr("r", 5)
      .attr("cx", (r) => xScale(r.date))
      .attr("cy", (r) => yScale(r.value))
      .attr("fill", 'red')
      .attr("fill-opacity",0.5)
      .attr('stroke', 'red');

    return () => {   };
  }, [flag]);



  return (
    <div id="scatter-plot-A">
        
      <svg ref={svgRef}></svg>
      <button
        onClick={() => {
          setFlag(flag +1);
          //console.log("buttonchange radius:", r);
        }}
      >
        Radius change
      </button>
    </div>
  );
};
export default ScatterPlot;
