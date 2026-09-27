import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ReminderList from '../components/ReminderList';
import NotesPanel from '../components/NotesPanel';
import AgendaPanel from '../components/AgendaPanel';
import CalendarPanel from '../components/CalendarPanel';
import AIChatPanel from '../components/AIChatPanel';
import ChatPanel from '../components/ChatPanel';
import MeetingPanel from '../components/MeetingPanel';

function DashboardPage() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Topbar />
        <div className="content-grid">
          <div className="column large">
            <ReminderList />
            <NotesPanel />
          </div>
          <div className="column small">
            <AgendaPanel />
            <AIChatPanel />
            <ChatPanel />
            <MeetingPanel />
          </div>
          <div className="column wide">
            <CalendarPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
