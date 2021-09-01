import { select } from 'd3';
import "./styles/index.scss"



// console.log(a);
// function 
render();
window.addEventListener('resize', render);

function render() {
    const screen_props = {
        width: document.body.clientWidth,
        height: document.body.clientHeight - 80,
        margin: { top: 20, bottom: 20, left: 20, right: 20 }
    };
    myResponsiveComponent(select('body'), screen_props)

}

function myResponsiveComponent(container, props) {
    const { width, height, margin } = props;
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
