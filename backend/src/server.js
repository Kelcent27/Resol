const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const reminders = [
  { id: 1, title: 'Team stand-up', note: 'Share blockers and sprint goal', due: '2026-09-28T09:00', completed: false, priority: 'High' },
  { id: 2, title: 'Design review', note: 'Review onboarding flow with product team', due: '2026-09-29T13:30', completed: false, priority: 'Medium' },
];

const notes = [
  { id: 1, title: 'Weekly focus', content: 'Ship the reminder dashboard, improve notification flow, and test AI summaries.' },
];

const meetings = [
  { id: 1, title: 'Product sync', date: '2026-09-28', time: '10:00', link: 'https://meet.resol.app/room/alpha' },
];

const messages = [
  { id: 1, user: 'AI', text: 'Welcome back! Want a summary of your day?' },
];

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid auth token' });
  }
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Resol backend is running' });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const token = jwt.sign({ email, name }, process.env.JWT_SECRET || 'supersecretjwtkey');
  return res.status(201).json({ token, user: { name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const token = jwt.sign({ email, name: 'Alex' }, process.env.JWT_SECRET || 'supersecretjwtkey');
  return res.json({ token, user: { name: 'Alex', email } });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    user: req.user,
    reminders,
    notes,
    agenda: [
      { time: '09:00', task: 'Team sync' },
      { time: '11:30', task: 'Review notes' },
      { time: '15:00', task: 'Focus block' },
    ],
    meetings,
    notifications: [{ id: 1, text: 'Reminder: Team stand-up starts in 30 minutes.' }],
  });
});

app.get('/api/reminders', authMiddleware, (req, res) => {
  res.json(reminders);
});

app.post('/api/reminders', authMiddleware, (req, res) => {
  const reminder = {
    id: Date.now(),
    ...req.body,
  };
  reminders.push(reminder);
  res.status(201).json(reminder);
});

app.get('/api/notes', authMiddleware, (req, res) => {
  res.json(notes);
});

app.post('/api/notes', authMiddleware, (req, res) => {
  const note = {
    id: Date.now(),
    ...req.body,
  };
  notes.push(note);
  res.status(201).json(note);
});

app.post('/api/ai/assist', authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  const response = {
    text: `AI summary: Here are your priorities for the day: 1) Review your reminders 2) Prepare agenda updates 3) Join the afternoon meeting.`,
    suggestions: ['Review reminders', 'Prepare notes', 'Check the agenda'],
  };

  return res.json(response);
});

app.get('/api/chat/messages', authMiddleware, (req, res) => {
  res.json(messages);
});

app.post('/api/chat/messages', authMiddleware, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Message text required' });
  }

  const newMessage = { id: Date.now(), user: 'Me', text };
  messages.push(newMessage);
  io.emit('chat:new-message', newMessage);
  res.status(201).json(newMessage);
});

app.get('/api/meetings', authMiddleware, (req, res) => {
  res.json(meetings);
});

app.post('/api/meetings', authMiddleware, (req, res) => {
  const meeting = { id: Date.now(), ...req.body };
  meetings.push(meeting);
  io.emit('meeting:created', meeting);
  res.status(201).json(meeting);
});

io.on('connection', (socket) => {
  socket.on('chat:send', (message) => {
    const saved = { id: Date.now(), user: 'Me', text: message };
    messages.push(saved);
    io.emit('chat:new-message', saved);
  });

  socket.on('notification:send', (data) => {
    io.emit('notification:new', data);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Resol backend running on http://localhost:${PORT}`);
});
