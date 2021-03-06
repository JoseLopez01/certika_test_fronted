import { NavLink } from "react-router-dom";

export default function HeaderComponent() {
  return (
    <div className="header-container">
      <div className="header-links">
        <div className="header-link">
          <NavLink to="/" exact activeClassName="active-link">
            Monitor
          </NavLink>
        </div>
        <div className="header-link">
          <NavLink to="/monitorings" activeClassName="active-link">
            Monitorings
          </NavLink>
        </div>
      </div>
    </div>
  );
}
