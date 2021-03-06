import { useEffect, useState } from "react";
import axios from "axios";

import { MonitoringsTable } from "./components/monitorings-table/monitorings-table.component";
import { MonitoringsForm } from "./components/monitorings-form/monitorings-form.component";
import { Modal } from "./../../shared/modal";

export const MonitoringsPage = () => {
  const [monitorings, setMonitorings] = useState([]);
  const [monitors, setMonitors] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [monitoringId, setMonitoringId] = useState(null);
  const [editingMonitor, setEditingMonitoring] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/monitoring/").then((res) => {
      setMonitorings(res.data);
    });
    axios.get("http://localhost:3001/api/monitor/").then((res) => {
      setMonitors(res.data);
    });
  }, []);

  useEffect(() => {
    if (monitoringId) {
      axios
        .get(`http://localhost:3001/api/monitoring/${monitoringId}`)
        .then(({ data }) => {
          const [monitoring] = data.data;
          setEditingMonitoring(monitoring);
          setOpenModal(true);
        });
    }
  }, [monitoringId]);

  const onModalClose = () => {
    if (monitoringId || editingMonitor) {
      setEditingMonitoring(null);
      setMonitoringId(null);
    }
    setOpenModal(false);
  };

  return (
    <div className="main-content">
      <MonitoringsTable
        monitorings={monitorings}
        openModal={() => setOpenModal(true)}
        monitoringid={(id) => setMonitoringId(id)}
      />
      <MonitoringsForm monitors={monitors} />
      {openModal && (
        <Modal closeModal={() => onModalClose()}>
          <MonitoringsForm monitors={monitors} />
        </Modal>
      )}
    </div>
  );
};
