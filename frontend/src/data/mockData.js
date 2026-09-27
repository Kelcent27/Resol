export const mockData = {
  reminders: [
    { id: 1, title: 'Team stand-up', note: 'Share blockers and sprint goal', due: '2026-09-28T09:00', completed: false, priority: 'High' },
    { id: 2, title: 'Design review', note: 'Review onboarding flow with product team', due: '2026-09-29T13:30', completed: false, priority: 'Medium' },
    { id: 3, title: 'Project planning', note: 'Finalize roadmap for October', due: '2026-09-30T16:00', completed: true, priority: 'Low' },
  ],
  notes: [
    { id: 1, title: 'Weekly focus', content: 'Ship the reminder dashboard, improve notification flow, and test AI summaries.' },
    { id: 2, title: 'Product ideas', content: 'Auto-suggest reminders based on email and meetings.' },
  ],
  agenda: [
    { time: '09:00', task: 'Team sync' },
    { time: '11:30', task: 'Review notes' },
    { time: '15:00', task: 'Focus block' },
  ],
  chatMessages: [
    { id: 1, user: 'AI', text: 'Welcome back! Want a summary of your day?' },
    { id: 2, user: 'Me', text: 'Yes, summarize my top priorities.' },
  ],
  meetings: [
    { id: 1, title: 'Product sync', date: '2026-09-28', time: '10:00', link: 'https://meet.resol.app/room/alpha' },
    { id: 2, title: 'Sprint review', date: '2026-09-29', time: '14:00', link: 'https://meet.resol.app/room/beta' },
  ],
};
