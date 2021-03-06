import { Link } from 'react-router-dom';

export default function HeaderComponent() {
  return (
    <div className="header-container">
      <div className="header-links">
        <div className="header-link active-link">
          <Link to="/">Monitor</Link>
        </div>
        <div className="header-link">
          <Link to="/monitorings">Monitorings</Link>
        </div>
      </div>
    </div>
  );
}