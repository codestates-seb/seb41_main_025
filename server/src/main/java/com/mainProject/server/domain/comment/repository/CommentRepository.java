package com.mainProject.server.domain.comment.repository;

import com.mainProject.server.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
