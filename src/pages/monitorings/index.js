/* React imports */
import { useEffect, useState } from "react";

/* Third parts imports */
import axios from "axios";

/* Constants imports */
import { API_ENDPOINT } from "../../core/constants";

/* Components imports */
import MonitoringsTable from "./components/monitorings-table.component";
import MonitoringsForm from "./components/monitorings-form.component";

/* Shared imports */
import Modal from "./../../shared/modal";

function MonitoringsPage() {
  const [monitorings, setMonitorings] = useState([]);
  const [monitors, setMonitors] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [monitoringId, setMonitoringId] = useState(null);
  const [editingMonitoring, setEditingMonitoring] = useState(null);

  const getMonitorings = () => {
    axios.get(`${API_ENDPOINT}/monitoring`).then((res) => {
      setMonitorings(res.data);
    });
  };

  useEffect(() => {
    getMonitorings();
    axios.get(`${API_ENDPOINT}/monitor`).then((res) => {
      setMonitors(res.data);
    });
  }, []);

  useEffect(() => {
    if (monitoringId) {
      axios
        .get(`${API_ENDPOINT}/monitoring/${monitoringId}`)
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
        monitors={monitors}
        editingMonitoring={editingMonitoring}
        onFinish={onFinish}
      />
      {openModal && (
        <Modal closeModal={onModalClose}>
          <MonitoringsForm
            monitors={monitors}
            editingMonitoring={editingMonitoring}
            onFinish={onFinish}
          />
        </Modal>
      )}
    </div>
  );
}

export default MonitoringsPage;
