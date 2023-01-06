package com.mainProject.server.domain.comment.service;

import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.comment.repository.CommentRepository;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CustomBeanUtils<Comment> beanUtils;

    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        Comment updateComment = beanUtils.copyNonNullProperties(comment, findComment);

        return commentRepository.save(updateComment);

    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    private void VerifiedCommentBody(String commentTitle) {
        Optional<Comment> optionalComment = commentRepository.findByCommentBody(commentTitle);
        if (optionalComment.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_EXISTS);
        }

    }
}
