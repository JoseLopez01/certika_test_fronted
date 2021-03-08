/* React imports */
import { useEffect, useState } from "react";

/* Third part imports */
import axios from "axios";

/* Constants imports */
import { API_ENDPOINT } from "../../core/constants";

/* Components imports */
import MonitorsTable from "./components/monitors-table.component";
import MonitorsForm from "./components/monitors-form.component";

/* Shared imports */
import Modal from "./../../shared/modal";

function MonitorPage(props={}) {

  const [monitors, setMonitors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [monitorId, setMonitorId] = useState(null);
  const [editingMonitor, setEditingMonitor] = useState(null);

  useEffect(() => {
    getMonitors();
  }, []);

  const getMonitors = () => {
    axios.get(`${API_ENDPOINT}/monitor`).then((res) => {
      setMonitors(res.data);
    });
  };

  const finishHandler = () => {
    onModalClose();
    getMonitors();
  };

  useEffect(() => {
    if (monitorId) {
      axios
        .get(`${API_ENDPOINT}/monitor/${monitorId}`)
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
    };
    setOpenModal(false);
  };

  return (
    <div className="main-content">
      <MonitorsTable
        monitors={monitors}
        openModal={() => setOpenModal(true)}
        monitorId={(id) => setMonitorId(id)}
      />
      <MonitorsForm editingMonitor={editingMonitor} onFinish={finishHandler} />
      {openModal && (
        <Modal closeModal={onModalClose}>
          <MonitorsForm editingMonitor={editingMonitor} onFinish={finishHandler} />
        </Modal>
      )}
    </div>
  );
};

export default MonitorPage;
