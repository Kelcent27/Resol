import { mockData } from '../data/mockData';

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Overview</p>
        <h1>Good morning, Alex</h1>
      </div>
      <div className="topbar-actions">
        <button className="secondary-btn">Notifications</button>
        <button className="primary-btn">New reminder</button>
      </div>
    </header>
  );
}

export default Topbar;
