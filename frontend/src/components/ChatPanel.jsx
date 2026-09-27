function ChatPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Team Chat</h3>
      </div>
      <div className="chat-container small">
        <div className="bubble"><strong>Mary:</strong> Can we share the release plan?</div>
        <div className="bubble mine"><strong>You:</strong> Yes, I’ll send it after stand-up.</div>
      </div>
      <div className="chat-input-row">
        <input type="text" placeholder="Type a message" />
        <button className="primary-btn">Send</button>
      </div>
    </section>
  );
}

export default ChatPanel;
