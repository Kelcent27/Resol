import { mockData } from '../data/mockData';

function MeetingPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Meetings</h3>
      </div>
      <div className="meeting-list">
        {mockData.meetings.map((meeting) => (
          <div className="meeting-item" key={meeting.id}>
            <div>
              <strong>{meeting.title}</strong>
              <p>{meeting.date} • {meeting.time}</p>
            </div>
            <a href={meeting.link} target="_blank" rel="noreferrer">Join</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MeetingPanel;
