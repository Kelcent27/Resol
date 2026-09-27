package com.resol.controller;

import com.resol.entity.*;
import com.resol.repository.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    private final UserRepository userRepository;
    private final ReminderRepository reminderRepository;
    private final NoteRepository noteRepository;
    private final MeetingRepository meetingRepository;
    private final MessageRepository messageRepository;

    public HomeController(UserRepository userRepository,
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

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        List<Reminder> reminders = reminderRepository.findByUser(user);
        List<Note> notes = noteRepository.findByUser(user);
        List<Meeting> meetings = meetingRepository.findByUser(user);
        List<ChatMessage> messages = messageRepository.findByUser(user);

        model.addAttribute("user", user);
        model.addAttribute("reminders", reminders);
        model.addAttribute("notes", notes);
        model.addAttribute("meetings", meetings);
        model.addAttribute("messages", messages);

        return "dashboard";
    }
}
