import { useEffect, useState } from "react";
import axios from "axios";
import MaskInput from "react-maskinput";

import FormInput from "../../../shared/form-input";
import { noBlank, isAValidEmail } from "../../utils";

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  career: "",
  phonenumber: "",
  email: "",
  semester: "",
  identification: "",
};

function MonitorsForm(props) {
  const [newMonitor, setNewMonitor] = useState(INITIAL_STATE);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (props.editingMonitor) {
      setEditing(true);
      setErrors([]);
      assignEditingMonitor(props.editingMonitor);
    }
  }, [props.editingMonitor]);

  const assignEditingMonitor = (editingMonitor) => {
    setNewMonitor({ ...editingMonitor });
  };

  const formIsValid = () => {
    const fieldsErrors = noBlank(newMonitor);
    if (!fieldsErrors.includes("email") && !isAValidEmail(newMonitor.email)) {
      fieldsErrors.push("email");
    }
    setErrors(fieldsErrors.length ? fieldsErrors : []);
    return fieldsErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      if (editing) {
        axios
          .put(`http://localhost:3001/api/monitor/${newMonitor.id}`, newMonitor)
          .then(props.onFinish);
      } else {
        axios
          .post("http://localhost:3001/api/monitor", newMonitor)
          .then(props.onFinish);
      }
      setNewMonitor(INITIAL_STATE);
      setEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMonitor({
      ...newMonitor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    const { id } = newMonitor;
    axios.delete(`http://localhost:3001/api/monitor/${id}`).then(() => {
      setNewMonitor(INITIAL_STATE);
      props.onFinish();
    });
  };

  const handleCancel = () => {
    setNewMonitor(INITIAL_STATE);
    setEditing(false);
    setErrors([]);
  };

  return (
    <div className="form-container">
      <div className="form-title">
        {editing ? "Update" : "Create"} A Monitor
      </div>
      <form onSubmit={handleSubmit} autoComplete="false">
        <FormInput
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={handleInputChange}
          value={newMonitor.firstname}
          form_errors={errors}
        />
        <FormInput
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={newMonitor.lastname}
          onChange={handleInputChange}
          form_errors={errors}
        />
        <FormInput
          type="text"
          name="identification"
          placeholder="Identification"
          onChange={handleInputChange}
          value={newMonitor.identification}
          form_errors={errors}
        />
        <div className="form-group masked">
          <MaskInput
            alwaysShowMask
            maskChar="_"
            name="phonenumber"
            mask="(000) 000 0000"
            value={newMonitor.phonenumber}
            onChange={handleInputChange}
            {...(errors.includes("phonenumber") && {
              className: "input-error",
            })}
          />
        </div>
        <FormInput
          type="text"
          name="career"
          placeholder="Career"
          value={newMonitor.career}
          onChange={handleInputChange}
          form_errors={errors}
        />
        <FormInput
          type="number"
          name="semester"
          placeholder="Semester"
          value={newMonitor.semester}
          onChange={handleInputChange}
          form_errors={errors}
        />
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          value={newMonitor.email}
          onChange={handleInputChange}
          form_errors={errors}
        />
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

export default MonitorsForm;
