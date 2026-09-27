function NotesPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Notes</h3>
        <button className="secondary-btn">Write</button>
      </div>
      <div className="note-list">
        {[
          { title: 'Weekly focus', body: 'Focus on retrieval and user onboarding improvements.' },
          { title: 'Ideas', body: 'Offer AI-generated task summaries and meeting notes.' },
        ].map((note) => (
          <article className="note-card" key={note.title}>
            <h4>{note.title}</h4>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NotesPanel;
