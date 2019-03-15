import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import {FormContextProvider} from "./contexts/form";

ReactDOM.render(<FormContextProvider><App /></FormContextProvider>, document.getElementById("root"));
