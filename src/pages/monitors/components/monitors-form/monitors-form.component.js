import { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../../../../shared/form-input";

function MonitorsForm(props) {
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newMonitor, setNewMonitor] = useState({
    firstname: "",
    lastname: "",
    career: "",
    phonenumber: "",
    email: "",
    semester: "",
    identification: "",
  });

  useEffect(() => {
    if (props.editingMonitor) {
      setEditing(true);
      assignEditingMonitor(props.editingMonitor);
    }
  }, [props.editingMonitor]);

  const assignEditingMonitor = editingMonitor => {
    setNewMonitor({
      firstname: editingMonitor.firstname,
      lastname: editingMonitor.lastname,
      career: editingMonitor.career,
      phonenumber: editingMonitor.phonenumber,
      email: editingMonitor.email,
      semester: editingMonitor.semester,
      identification: editingMonitor.identification,
      id: editingMonitor.id,
    });
  };

  const noBlank = () => {
    let dataArray = Object.entries(newMonitor),
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
          .put(`http://localhost:3001/api/monitor/${newMonitor.id}`, newMonitor)
          .then(props.onFinish);
      } else {
        axios
          .post("http://localhost:3001/api/monitor", newMonitor)
          .then(props.onFinish);
      }
      setNewMonitor({
        firstname: "",
        lastname: "",
        career: "",
        phonenumber: "",
        email: "",
        semester: "",
        identification: "",
      });
      setEditing(false);
      setErrors([]);
    } else {
      setErrors(fieldsErrors);
    }
  };

  const handleInputChange = (e) => {
    setNewMonitor({
      ...newMonitor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    let { id } = newMonitor;
    axios
      .delete(`http://localhost:3001/api/monitor/${id}`)
      .then(props.onFinish);
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
          name="phonenumber"
          placeholder="Phone Number"
          onChange={handleInputChange}
          value={newMonitor.phonenumber}
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
        <div className="form-group">
          {editing && (
            <button className="delete-btn" onClick={handleDelete} type="button">
              Delete
            </button>
          )}
          <input type="submit" value={editing ? "Update" : "Save"} />
        </div>
      </form>
    </div>
  );
};

export default MonitorsForm;
