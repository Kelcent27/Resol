import { mockData } from '../data/mockData';

function ReminderList() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Reminders</h3>
        <button className="primary-btn">+ Add</button>
      </div>
      <div className="list">
        {mockData.reminders.map((item) => (
          <div className={`task-item ${item.completed ? 'done' : ''}`} key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.note}</p>
            </div>
            <div className="task-meta">
              <span>{item.priority}</span>
              <small>{new Date(item.due).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReminderList;
