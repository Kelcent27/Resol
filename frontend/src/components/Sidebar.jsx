import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Resol</div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/">Reminders</Link>
        <Link to="/">Notes</Link>
        <Link to="/">Calendar</Link>
        <Link to="/">AI</Link>
        <Link to="/">Chat</Link>
        <Link to="/">Meetings</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
