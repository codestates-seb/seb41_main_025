package com.mainProject.server.domain.comment.repository;

import com.mainProject.server.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByCommentBody(String commentBody);
}
