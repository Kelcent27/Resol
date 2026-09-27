function CalendarPanel() {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Calendar</h3>
      </div>
      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label) => (
          <div key={label} className="calendar-head">{label}</div>
        ))}
        {days.map((day) => (
          <div key={day} className={`calendar-day ${day === 18 ? 'highlight' : ''}`}>
            <span>{day}</span>
            {day === 18 || day === 24 || day === 29 ? <i className="dot" /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarPanel;
