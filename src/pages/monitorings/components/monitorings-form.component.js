import { useEffect, useState } from "react";
import axios from "axios";
import MaskInput from "react-maskinput";
import { isAValidDate, isAValidHour, noBlank } from "../../utils";

const INITIAL_STATE = {
  class: "",
  monitorid: 0,
  classroom: "",
  monitoringdate: "",
  monitoringhour: "",
};

function MonitoringsForm(props) {
  const [newMonitoring, setNewMonitoring] = useState(INITIAL_STATE);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (props.editingMonitoring) {
      setEditing(true);
      setErrors([]);
      assignEditingMonitoring(props.editingMonitoring);
    }
  }, [props.editingMonitoring]);

  const assignEditingMonitoring = (editingMonitoring) => {
    setNewMonitoring({ ...editingMonitoring });
  };

  const handleInputChange = (e) => {
    setNewMonitoring({
      ...newMonitoring,
      [e.target.name]: e.target.value,
    });
  };

  const formIsValid = () => {
    const fieldsErrors = noBlank(newMonitoring);
    if (
      !fieldsErrors.includes("monitoringdate") &&
      !isAValidDate(newMonitoring.monitoringdate)
    ) {
      fieldsErrors.push("monitoringdate");
    }
    if (
      !fieldsErrors.includes("monitoringhour") &&
      !isAValidDate(newMonitoring.monitoringhour)
    ) {
      fieldsErrors.push("monitoringhour");
    }
    setErrors(fieldsErrors.length ? fieldsErrors : []);
    return fieldsErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
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
    }
  };

  const handleDelete = () => {
    const { id } = newMonitoring;
    axios
      .delete(`http://localhost:3001/api/monitoring/${id}`)
      .then(props.onFinish);
  };

  const handleCancel = () => {
    setNewMonitoring(INITIAL_STATE);
    setEditing(false);
    setErrors([]);
    props.onFinish();
  };

  return (
    <div className="form-container">
      <div className="form-title">
        {editing ? "Update" : "Create"} A Monitoring
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={newMonitoring.class}
            onChange={handleInputChange}
            {...(errors.includes("class") && { className: "input-error" })}
          />
        </div>
        <div className="form-group">
          <select
            name="monitorid"
            value={newMonitoring.monitorid}
            onChange={handleInputChange}
            {...(errors.includes("monitorid") && { className: "input-error" })}
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
            {...(errors.includes("classroom") && { className: "input-error" })}
          />
        </div>
        <div className="form-group masked">
          <MaskInput
            maskChar="_"
            name="monitoringdate"
            mask="0000-00-00"
            placeholder="Date YYYY-MM-DD"
            value={newMonitoring.monitoringdate}
            onChange={handleInputChange}
            {...(errors.includes("monitoringdate") && {
              className: "input-error",
            })}
          />
        </div>
        <div className="form-group masked">
          <MaskInput
            maskChar="_"
            name="monitoringhour"
            mask="00:00"
            placeholder="Hour HH:MM"
            value={newMonitoring.monitoringhour}
            onChange={handleInputChange}
            {...(errors.includes("monitoringhour") && {
              className: "input-error",
            })}
          />
        </div>
        <div className="form-group-footer form-group">
          {editing && (
            <button className="delete-btn" onClick={handleDelete} type="button">
              Delete
            </button>
          )}
          <button className="cancel-btn" onClick={handleCancel} type="button">
            Cancel
          </button>
          <input type="submit" value={editing ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
}

export default MonitoringsForm;
