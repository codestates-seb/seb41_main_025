package com.mainProject.server.domain.content.repository;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<Content> findByContentTitle(String contentTitle);
}
