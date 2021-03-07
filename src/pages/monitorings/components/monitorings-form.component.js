import { useEffect, useState } from "react";
import axios from "axios";
import { noBlank } from "../../utils";

const INITIAL_STATE = {
  class: "",
  monitorid: 0,
  classroom: "",
  monitoringdate: "",
};

function MonitoringsForm (props) {

  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newMonitoring, setNewMonitoring] = useState(INITIAL_STATE);

  useEffect(() => {
    if (props.editingMonitoring) {
      setEditing(true);
      assignEditingMonitoring(props.editingMonitoring);
    }
  }, [props.editingMonitoring]);

  const assignEditingMonitoring = (editingMonitoring) => {
    setNewMonitoring({...editingMonitoring});
  };

  const handleInputChange = (e) => {
    setNewMonitoring({
      ...newMonitoring,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fieldsErrors = noBlank(newMonitoring);
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
      setNewMonitoring(INITIAL_STATE);
      setEditing(false);
      setErrors([]);
    } else {
      setErrors(fieldsErrors);
    };
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