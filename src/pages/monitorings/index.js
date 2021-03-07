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
  const [editingMonitoring, setEditingMonitoring] = useState(null);

  const getMonitorings = () => {
    axios.get("http://localhost:3001/api/monitoring/").then((res) => {
      setMonitorings(res.data);
    });
  };

  useEffect(() => {
    getMonitorings();
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
    if (monitoringId || editingMonitoring) {
      setEditingMonitoring(null);
      setMonitoringId(null);
    }
    setOpenModal(false);
  };

  const onFinish = () => {
    onModalClose();
    getMonitorings();
  };

  return (
    <div className="main-content">
      <MonitoringsTable
        monitorings={monitorings}
        openModal={() => setOpenModal(true)}
        monitoringid={(id) => setMonitoringId(id)}
      />
      <MonitoringsForm
        editingMonitoring={editingMonitoring}
        monitors={monitors}
        onFinish={() => onFinish()}
      />
      {openModal && (
        <Modal closeModal={() => onModalClose()}>
          <MonitoringsForm
            monitors={monitors}
            editingMonitoring={editingMonitoring}
            onFinish={() => onFinish()}
          />
        </Modal>
      )}
    </div>
  );
};
