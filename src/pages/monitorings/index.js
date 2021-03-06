import { useEffect, useState } from "react";
import axios from "axios";

import { MonitoringsTable } from "./components/monitorings-table/monitorings-table.component";
import { MonitoringsForm } from "./components/monitorings-form/monitorings-form.component";
import { Modal } from "./../../shared/modal";

export const MonitoringsPage = () => {
  const [monitorings, setMonitorings] = useState([]);
  const [monitors, setMonitors] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/monitoring/").then((res) => {
      setMonitorings(res.data);
    });
    axios.get("http://localhost:3001/api/monitor/").then((res) => {
      setMonitors(res.data);
    });
  }, []);

  return (
    <div className="main-content">
      <MonitoringsTable monitorings={monitorings} openModal={() => setOpenModal(true)} />
      <MonitoringsForm monitors={monitors} />
      {openModal && (
        <Modal>
          <MonitoringsForm monitors={monitors} />
        </Modal>
      )}
    </div>
  );
};
