import { useEffect, useState } from "react";
import axios from "axios";

import { MonitorsTable } from "./components/monitors-table/monitors-table.component";
import { MonitorsForm } from "./components/monitors-form/monitors-form.component";
import { Modal } from "./../../shared/modal";

export const MonitorPage = () => {
  const [monitors, setMonitors] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/monitor").then((res) => {
      setMonitors(res.data);
    });
  }, []);

  return (
    <div className="main-content">
      <MonitorsTable monitors={monitors} openModal={() => setOpenModal(true)} />
      <MonitorsForm />
      {openModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <MonitorsForm />
        </Modal>
      )}
    </div>
  );
};
