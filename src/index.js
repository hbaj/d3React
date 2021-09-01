import {select} from 'd3';
import "./styles/index.scss"



// console.log(a);
// function 
function myResponsiveComponent(container, props){
    
    let svg = container.selectAll('svg').data([null]);
    svg = svg.join('svg')
    .attr('width',props.width)
    .attr('height',props.height);
    
    let rect  = svg.selectAll('rect').data([null]);
    
    rect
    .join('rect') 
    .attr('rx',100)   
    .attr('width',props.width)
    .attr('height',props.height)
    ;
}
window.addEventListener('resize',render)


function render(){
    const screen_props = {
        width: document.body.clientWidth,
        height:document.body.clientHeight-200,
    };
myResponsiveComponent(select('body'),screen_props)

}

render();