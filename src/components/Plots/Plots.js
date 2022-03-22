import React, { useState, useRef, useEffect } from "react";
import {
  select,
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  timeParse,
  timeFormat,
  axisLeft,
  axisBottom,
  min,
  max,
  extent,
  timeHour,
  timeDay,
  timeDays,
  timeMinute,
  schemeSet2,
} from "d3";
import sendGetRequest from "../AxiosRead";
import PropCharts from "./PropsChart";
import CalculateAxisProperties from "./CalculateAxisProperties";
import CalculateUniqueProperties from "./CalculateUniqueProperties";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
const ScatterPlot = () => {
  const [r, setR] = useState(null);
  const [flag, setFlag] = useState(0);
  const svgRef = useRef();
  const { width, height, margin, tickSeparationRatio } = PropCharts();

  const djangoApiUrl = "http://192.168.1.222:8000/var-meassures/";
  useEffect(() => {
    console.log("1 @@@@@ inside Plot.js useEffect function", r);
    const { width, height, margin, tickSeparationRatio } = PropCharts();
    console.log("flag:", flag);
    const axiosDatos = sendGetRequest(djangoApiUrl, r);
    axiosDatos.then((res) => setR(res));
    console.log("---------->inside Plots.js r:", r);
    if (!r) {
      console.log("inside !r  Plots.js check");
      return <h1>loading...</h1>;
    }
    // const formatTime = timeFormat('%Y-%m-%d %H:%M:%S')
    const formatTime = timeFormat("%y/%m/%d");
    const xAxisProps = CalculateAxisProperties(r.map((d) => d.date));

    const yAxisProps = CalculateAxisProperties(r.map((d) => d.value));
    const legendData = CalculateUniqueProperties(r.map((d) => d.variable));

    const svg = select(svgRef.current)
      .attr("width", width - margin.left)
      .attr("height", height - margin.top)
      .style("background-color", "white")
      .selectAll("g")
      .data([0])
      .join("g")
      .attr("class", "g-margin-plot")
      .attr("transform", "translate(" + margin.left + " " + margin.top + ")")
      .style("background-color", "purple");

    // ########### x axis setup ############
    var xmin = new Date(xAxisProps[0]);
    var xmax = new Date(xAxisProps[1]);
    console.log("---->", xmin, typeof xmin,"\n->",new Date());

    xmin.toDateString();
    xmax.toDateString();
    var deltaX = timeHour.count(xmin, xmax);
    console.log("======>", xmin);
    const xScale = scaleTime()
      .clamp(true)
      /* enter data to modify y scale   */
      .range([0, width - margin.right - 250])
      .domain([xmin, xmax])
      .nice();

    // const xAxis = axisBottom(xScale).ticks(deltaX / tickSeparationRatio);
    const xAxis = axisBottom(xScale).ticks(timeDay.every() ).tickFormat(timeFormat("%m-%d"));
    let xAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      .attr(
        "transform",
        "translate(0 " + (height - margin.bottom).toString() + ")"
      )
      .attr("class", "x-axis")
      .call(xAxis)
      .selectAll("text") // here down will fix all thick mark orientations
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

    const yAxis = axisLeft(yScale).ticks(
      (height - margin.top) / tickSeparationRatio
    );
    let yAxisG = svg
      .selectAll(".g-margin-plot")
      .data([0])
      .join("g")
      // .attr("transform", "translate(0 " + '20' + ")")
      .call(yAxis);
    // ########### legend setup ############
    console.log("datos para leyenda=", legendData);
    //const legendData = legends(r.map(d => d.))
    var color = scaleOrdinal().domain(legendData).range(schemeSet2);

    //###################### svg generator for plot ###########################################
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
      .attr("fill", (r) => color(r.variable))
      .attr("fill-opacity", 0.5)
      .attr("stroke", (r) => color(r.variable));

    return () => {};
  }, [flag]);

  return (
    <div id="scatter-plot-A" style={{ display: "inline-block" }}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box>
          <Paper elevation={24}>
            <svg ref={svgRef}></svg>
          </Paper>
        </Box>
        <Box
          sx={{
            // boxShadow: 1, // theme.shadows[1]
            color: "primary.main", // theme.palette.primary.main
            m: 1, // margin: theme.spacing(1)
            p: {
              xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
            },
            // zIndex: 'tooltip', // theme.zIndex.tooltip
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setFlag(flag + 1);
            }}
          >
            Upload
          </Button>
        </Box>
      </Grid>
    </div>
  );
};
export default ScatterPlot;
