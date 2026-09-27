import { mockData } from '../data/mockData';

function AgendaPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Agenda</h3>
      </div>
      <ul className="agenda-list">
        {mockData.agenda.map((item) => (
          <li key={item.time}>
            <span>{item.time}</span>
            <strong>{item.task}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AgendaPanel;
