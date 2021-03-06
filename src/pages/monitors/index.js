import { useEffect, useState } from "react";
import axios from "axios";

import { MonitorsTable } from "./components/monitors-table/monitors-table.component";
import { MonitorsForm } from "./components/monitors-form/monitors-form.component";
import { Modal } from "./../../shared/modal";

export const MonitorPage = () => {
  const [monitors, setMonitors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [monitorId, setMonitorId] = useState(null);
  const [editingMonitor, setEditingMonitor] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/monitor").then((res) => {
      setMonitors(res.data);
    });
  }, []);

  useEffect(() => {
    if (monitorId) {
      axios
        .get(`http://localhost:3001/api/monitor/${monitorId}`)
        .then(({ data }) => {
          setEditingMonitor(data.data[0]);
          setOpenModal(true);
        });
    }
  }, [monitorId]);

  const onModalClose = () => {
    if (monitorId || editingMonitor) {
      setEditingMonitor(null);
      setMonitorId(null);
    }
    setOpenModal(false);
  };

  return (
    <div className="main-content">
      <MonitorsTable
        monitors={monitors}
        openModal={() => setOpenModal(true)}
        monitorId={(id) => setMonitorId(id)}
      />
      <MonitorsForm editingMonitor={editingMonitor} />
      {openModal && (
        <Modal closeModal={() => onModalClose()}>
          <MonitorsForm editingMonitor={editingMonitor} />
        </Modal>
      )}
    </div>
  );
};
