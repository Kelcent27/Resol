package com.resol.config;

import com.resol.entity.User;
import com.resol.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("alex@resol.app").isEmpty()) {
                User user = new User();
                user.setName("Alex");
                user.setEmail("alex@resol.app");
                user.setPassword(passwordEncoder.encode("password123"));
                userRepository.save(user);
            }
        };
    }
}
