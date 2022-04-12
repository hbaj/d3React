import {render} from "react-dom";
import App from "./components/App"
import { select,scaleLinear, axisLeft, axisBottom } from 'd3';
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss"

render(
    <App/>
,
document.getElementById("root")
);
