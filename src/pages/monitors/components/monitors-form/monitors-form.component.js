import { useState } from "react";
import axios from "axios";

export const MonitorsForm = (props) => {
  const [newMonitor, setNewMonitor] = useState({
    firstname: "",
    lastname: "",
    career: "",
    phonenumber: "",
    email: "",
    semester: "",
    identification: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/monitor", newMonitor).then((res) => {
      console.log(res);
    });
  };

  const handleInputChange = (e) => {
    setNewMonitor({
      ...newMonitor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <div className="form-title">Create A Monitor</div>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="false">
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
            placeholder="Identifiacion"
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
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};
