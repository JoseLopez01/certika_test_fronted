export const MonitorsTable = (props) => {
  return (
    <div className="table-container">
      <div className="monitors-table-header">
        <div className="button-borderless">
          <button onClick={props.openModal} >Create</button>
        </div>
      </div>
      <table>
        <thead className="table-headers">
          <tr>
            <th className="column-name">Full Name</th>
            <th className="column-name">Career</th>
            <th className="column-name">Semester</th>
            <th className="column-name">Phone</th>
            <th className="column-name">Email</th>
          </tr>
        </thead>
        <tbody>
          {props.monitors.map((monitor) => (
            <tr key={monitor.id} className="column-row">
              <td className="column-value">
                {monitor.firstname} {monitor.lastname}
              </td>
              <td className="column-value">{monitor.career}</td>
              <td className="column-value">{monitor.semester}</td>
              <td className="column-value">{monitor.phonenumber}</td>
              <td className="column-value">{monitor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
