import { useEffect, useState } from "react";
import axios from "axios";

export const MonitoringsForm = (props) => {
  const [editing, setEditing] = useState(false);

  const [newMonitoring, setNewMonitoring] = useState({
    class: "",
    monitorid: 0,
    classroom: "",
    monitoringdate: "",
  });

  useEffect(() => {
    if (props.editingMonitoring) {
      setEditing(true);
      assignEditingMonitoring(props.editingMonitoring)
    }
  }, [props.editingMonitoring]);

  const assignEditingMonitoring = (editingMonitoring) => {
    setNewMonitoring({
      class: editingMonitoring.class,
      monitorid: editingMonitoring.monitorid,
      classroom: editingMonitoring.classroom,
      monitoringdate: editingMonitoring.monitoringdate,
      id: editingMonitoring.id,
    });
  };

  const handleInputChange = (e) => {
    setNewMonitoring({
      ...newMonitoring,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios
        .put(
          `http://localhost:3001/api/monitoring/${newMonitoring.id}`,
          newMonitoring
        )
        .then((res) => console.log());
    } else {
      axios
        .post("http://localhost:3001/api/monitoring/", newMonitoring)
        .then((res) => console.log(res.data));
    };
    setNewMonitoring({
      class: "",
      monitorid: 0,
      classroom: "",
      monitoringdate: "",
    });
    setEditing(false);
  };

  return (
    <div className="form-container">
      <div className="form-title">
      {editing ? "Update" : "Create"} A Monitoring</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={newMonitoring.class}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <select
            name="monitorid"
            value={newMonitoring.monitorid}
            onChange={handleInputChange}
          >
            <option value="0">Select A Monitor</option>
            {props.monitors.map((monitor) => (
              <option key={monitor.id} value={monitor.id}>
                {monitor.firstname} {monitor.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="classroom"
            placeholder="ClassRoom"
            value={newMonitoring.classroom}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="monitoringdate"
            placeholder="Date YYYY-MM-DD"
            value={newMonitoring.monitoringdate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value={editing ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
};
