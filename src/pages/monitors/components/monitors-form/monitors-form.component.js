import { useEffect, useState } from "react";
import axios from "axios";

export const MonitorsForm = (props) => {
  const [editing, setEditing] = useState(false);
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

  const assignEditingMonitor = (editingMonitor) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  const handleInputChange = (e) => {
    setNewMonitor({
      ...newMonitor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    let { id } = newMonitor;
    axios.delete(`http://localhost:3001/api/monitor/${id}`)
      .then(props.onFinish);
  };

  return (
    <div className="form-container">
      <div className="form-title">
        {editing ? "Update" : "Create"} A Monitor
      </div>
      <form onSubmit={handleSubmit} autoComplete="false">
        <div className="form-group">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={newMonitor.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={newMonitor.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="identification"
            placeholder="Identifiation"
            value={newMonitor.identification}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="career"
            placeholder="Career"
            value={newMonitor.career}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={newMonitor.semester}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={newMonitor.phonenumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newMonitor.email}
            onChange={handleInputChange}
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
