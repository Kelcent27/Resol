import { mockData } from '../data/mockData';

function AIChatPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>AI Assistant</h3>
      </div>
      <div className="chat-container small">
        {mockData.chatMessages.map((message) => (
          <div key={message.id} className={`bubble ${message.user === 'Me' ? 'mine' : ''}`}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input type="text" placeholder="Ask the assistant..." />
        <button className="primary-btn">Send</button>
      </div>
    </section>
  );
}

export default AIChatPanel;
