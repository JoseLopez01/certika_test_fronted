import { Fragment } from "react";

export const MonitoringsTable = (props) => {
  return (
    <Fragment>
      <div className="table-container">
        <div className="monitors-table-header">
          <div className="button-borderless">
            <button onClick={props.openModal}>Create</button>
          </div>
        </div>
        <table>
          <thead className="table-headers">
            <tr>
              <th className="column-name">Class</th>
              <th className="column-name">Monitor</th>
              <th className="column-name">Class Room</th>
              <th className="column-name">Date</th>
            </tr>
          </thead>
          <tbody>
            {props.monitorings.map((monitoring) => (
              <tr key={monitoring.id} className="column-row">
                <td className="column-value">{monitoring.class}</td>
                <td className="column-value">
                  {monitoring.monitor.firstname} {monitoring.monitor.lastname}
                </td>
                <td className="column-value">{monitoring.classroom}</td>
                <td className="column-value">{monitoring.monitoringdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
