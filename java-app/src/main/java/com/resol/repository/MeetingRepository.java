package com.resol.repository;

import com.resol.entity.Meeting;
import com.resol.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByUser(User user);
}
