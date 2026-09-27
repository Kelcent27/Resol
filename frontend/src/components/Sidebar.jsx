import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
      >
        {open ? '×' : '☰'}
      </button>

      {open && (
        <button
          className="mobile-menu-overlay"
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">Resol</div>
        <nav>
          <Link to="/" onClick={closeMenu}>Dashboard</Link>
          <Link to="/" onClick={closeMenu}>Reminders</Link>
          <Link to="/" onClick={closeMenu}>Notes</Link>
          <Link to="/" onClick={closeMenu}>Calendar</Link>
          <Link to="/" onClick={closeMenu}>AI</Link>
          <Link to="/" onClick={closeMenu}>Chat</Link>
          <Link to="/" onClick={closeMenu}>Meetings</Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
