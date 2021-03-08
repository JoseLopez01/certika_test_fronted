import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import MonitoringsPage from './pages/monitorings';
import MonitorPage from "./pages/monitors";
import Header from "./shared/header";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/monitorings" component={MonitoringsPage} exact/>
          <Route path="/" component={MonitorPage} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
