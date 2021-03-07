import { useEffect, useState } from "react";
import axios from "axios";

function MonitoringsForm (props) {
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newMonitoring, setNewMonitoring] = useState({
    class: "",
    monitorid: 0,
    classroom: "",
    monitoringdate: "",
  });

  useEffect(() => {
    if (props.editingMonitoring) {
      setEditing(true);
      assignEditingMonitoring(props.editingMonitoring);
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

  const noBlank = () => {
    let dataArray = Object.entries(newMonitoring),
      errors = [];
    for (let field of dataArray) {
      let [name, value] = field;
      if (!value) {
        errors.push(name);
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fieldsErrors = noBlank();
    if (fieldsErrors.length === 0) {
      if (editing) {
        axios
          .put(
            `http://localhost:3001/api/monitoring/${newMonitoring.id}`,
            newMonitoring
          )
          .then(props.onFinish);
      } else {
        axios
          .post("http://localhost:3001/api/monitoring/", newMonitoring)
          .then(props.onFinish);
      }
      setNewMonitoring({
        class: "",
        monitorid: 0,
        classroom: "",
        monitoringdate: "",
      });
      setEditing(false);
      setErrors([]);
    } else {
      setErrors(fieldsErrors);
    }
  };

  const handleDelete = () => {
    let { id } = newMonitoring;
    axios.delete(`http://localhost:3001/api/monitoring/${id}`)
      .then(props.onFinish);
  };

  return (
    <div className="form-container">
      <div className="form-title">
        {editing ? "Update" : "Create"} A Monitoring
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={newMonitoring.class}
            onChange={handleInputChange}
            {...errors.includes("class") && { className: "input-error" }}
          />
        </div>
        <div className="form-group">
          <select
            name="monitorid"
            value={newMonitoring.monitorid}
            onChange={handleInputChange}
            {...errors.includes("monitorid") && { className: "input-error" }}
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
            {...errors.includes("classroom") && { className: "input-error" }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="monitoringdate"
            placeholder="Date YYYY-MM-DD"
            value={newMonitoring.monitoringdate}
            onChange={handleInputChange}
            {...errors.includes("monitoringdate") && { className: "input-error" }}
          />
        </div>
        <div className="form-group">
          {editing &&
            <button className="delete-btn" onClick={handleDelete} type="button">
              Delete
            </button>}
          <input type="submit" value={editing ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
};

export default MonitoringsForm;