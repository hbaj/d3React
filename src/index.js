import { select,scaleLinear, axisLeft, axisBottom } from 'd3';
import "./styles/index.scss"



// console.log(a);
// function 
render();
window.addEventListener('resize', render);

function render() {
    const screen_props = {
        width: document.body.clientWidth-50,
        height: document.body.clientHeight - 200,
        margin: { top: 30, bottom: 100, left: 100, right: 30 },
        tickSeparationRatio:70
    };
    myResponsiveComponent(select('body'), screen_props)

}

function myResponsiveComponent(container, props) {
    const { width, height, margin, tickSeparationRatio } = props;
    let svg = container.selectAll('svg').data([null]);
    svg = svg.join('svg')
        .attr('width', width)
        .attr('height', height);

    const { g, innerWidth, innerHeight } = marginConvention(svg, { width, height, margin })

    // console.log(innerHeight, innerWidth)
    //**********************************************************
    //****************** play ground in here *******************
    //**********************************************************

    let rect = g.selectAll('rect').data([null]);
    rect.join('rect')
        .attr('rx', 50)
        .attr('width', innerWidth)
        .attr('height', innerHeight);
    //**********************************************************
    //****************** play ground up here *******************
    //**********************************************************
    
    // ########### y axis setup ############
    const yScale = scaleLinear()
    .domain([0,1]) /* enter data to modify y scale   */
    .range([innerHeight,0]);
    const yAxis = axisLeft(yScale)
    .ticks(innerHeight/tickSeparationRatio);
    let yAxisG = g.selectAll('.y-axis').data([null]);
    yAxisG = yAxisG.join('g')
    .attr('class','y-axis') /* enter data to modify y scale Name   */
    .merge(yAxisG);
    yAxisG.call(yAxis);
    // ########### x axis setup ############
    const xScale = scaleLinear()
    .domain([0,1]) /* enter data to modify x scale   */
    .range([0,innerWidth]);
    const xAxis = axisBottom(xScale)
    .ticks(innerWidth/tickSeparationRatio);
    let xAxisG = g.selectAll('.x-axis').data([null]);
    xAxisG = xAxisG.join('g')
    .attr('class','x-axis') /* enter data to modify x scale Name   */
    .merge(xAxisG)
    .attr('transform',`translate(0,${innerHeight})`);
    xAxisG.call(xAxis)
    ;
    // ########### x axis LABLE setup ############
    const xAxisLabel = xAxisG.selectAll('.axis-label').data([null]);
    xAxisLabel.join('text')
    .attr('class','axis-label')
    .attr('fill','black')
    .merge(xAxisLabel)
    .text('X axis name')
    .attr('x', innerWidth/2)
    .attr('y',30);

    const yAxisLabel = yAxisG.selectAll('.axis-label').data([null]);
    yAxisLabel.join('text')
    .attr('class','axis-label')
    .attr('fill', 'black')
    .merge(yAxisLabel)
    .text('y Axis name')
    .attr('transform',`rotate(-90)`)
    .attr('x',-innerHeight/2)
    .attr('y', -40)

    //**********************************************************    
    //****************** end play ground in here ***************
    //**********************************************************
}

function marginConvention(selection, props) {

    const { width, 
        height, 
        margin,
        className = 'margin-group' 
        } = props;
    let g = selection.selectAll('.' + className).data([null]);
    g = g.join('g')
        .attr('class', className)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    return { g, innerWidth, innerHeight }

}
