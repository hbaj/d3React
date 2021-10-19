import {
  min,
  max,
  extent,
} from "d3";

 const  CalculateAxisProperties = (axisData) => {
  let b = min(axisData);
  let c = max(axisData);
  let d = extent(axisData);
  return [b, c, d];
}
export  default CalculateAxisProperties;