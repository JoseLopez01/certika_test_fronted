import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import MonitorPage from "./pages/monitors";
import HeaderComponent from "./shared/header";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <BrowserRouter>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={MonitorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
