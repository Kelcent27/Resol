package com.resol.controller;

import com.resol.entity.*;
import com.resol.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final UserRepository userRepository;
    private final ReminderRepository reminderRepository;
    private final NoteRepository noteRepository;
    private final MeetingRepository meetingRepository;
    private final MessageRepository messageRepository;

    public ApiController(UserRepository userRepository,
                        ReminderRepository reminderRepository,
                        NoteRepository noteRepository,
                        MeetingRepository meetingRepository,
                        MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.reminderRepository = reminderRepository;
        this.noteRepository = noteRepository;
        this.meetingRepository = meetingRepository;
        this.messageRepository = messageRepository;
    }

    private User currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName()).orElseThrow();
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        User user = currentUser();
        Map<String, Object> result = new HashMap<>();
        result.put("user", user.getName());
        result.put("reminders", reminderRepository.findByUser(user));
        result.put("notes", noteRepository.findByUser(user));
        result.put("meetings", meetingRepository.findByUser(user));
        result.put("messages", messageRepository.findByUser(user));
        return result;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Map<String, String>> register(@RequestParam String name,
                                                       @RequestParam String email,
                                                       @RequestParam String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User created successfully"));
    }

    @GetMapping("/reminders")
    public List<Reminder> reminders() {
        return reminderRepository.findByUser(currentUser());
    }

    @PostMapping("/reminders")
    public Reminder createReminder(@RequestBody Reminder reminder) {
        User user = currentUser();
        reminder.setUser(user);
        reminder.setDueAt(reminder.getDueAt() == null ? LocalDateTime.now() : reminder.getDueAt());
        return reminderRepository.save(reminder);
    }

    @PutMapping("/reminders/{id}")
    public Reminder updateReminder(@PathVariable Long id, @RequestBody Reminder incoming) {
        Reminder reminder = reminderRepository.findById(id).orElseThrow();
        reminder.setTitle(incoming.getTitle());
        reminder.setNote(incoming.getNote());
        reminder.setPriority(incoming.getPriority());
        reminder.setCompleted(incoming.isCompleted());
        reminder.setDueAt(incoming.getDueAt());
        return reminderRepository.save(reminder);
    }

    @DeleteMapping("/reminders/{id}")
    public void deleteReminder(@PathVariable Long id) {
        reminderRepository.deleteById(id);
    }

    @GetMapping("/notes")
    public List<Note> notes() {
        return noteRepository.findByUser(currentUser());
    }

    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note) {
        note.setUser(currentUser());
        return noteRepository.save(note);
    }

    @GetMapping("/meetings")
    public List<Meeting> meetings() {
        return meetingRepository.findByUser(currentUser());
    }

    @PostMapping("/meetings")
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        meeting.setUser(currentUser());
        return meetingRepository.save(meeting);
    }

    @GetMapping("/messages")
    public List<ChatMessage> messages() {
        return messageRepository.findByUser(currentUser());
    }

    @PostMapping("/messages")
    public ChatMessage createMessage(@RequestBody ChatMessage message) {
        message.setUser(currentUser());
        return messageRepository.save(message);
    }

    @PostMapping("/ai")
    public Map<String, String> aiSummary(@RequestBody Map<String, String> payload) {
        String prompt = payload.getOrDefault("prompt", "Summarize my day");
        Map<String, String> response = new HashMap<>();
        response.put("summary", "AI plan: review reminders, check meetings, and focus on the most important task. Prompt: " + prompt);
        return response;
    }
}
