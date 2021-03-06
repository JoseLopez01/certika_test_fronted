import { useEffect, useState } from "react";
import axios from "axios";

import { MonitorsTable } from "./components/monitors-table/monitors-table.component";
import { MonitorsForm } from './components/monitors-form/monitors-form.component';

export const MonitorPage = () => {
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/monitor").then((res) => {
      setMonitors(res.data);
    });
  }, []);

  return (
    <div className="main-content">
      <MonitorsTable monitors={monitors} />
      <MonitorsForm />
    </div>
  );
}
