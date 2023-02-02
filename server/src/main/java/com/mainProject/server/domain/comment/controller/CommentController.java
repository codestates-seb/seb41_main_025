package com.mainProject.server.domain.comment.controller;

import com.mainProject.server.domain.comment.dto.CommentDto;
import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.comment.mapper.CommentMapper;
import com.mainProject.server.domain.comment.service.CommentService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    // TODO POST
    @PostMapping("/contents/{content-id}/comments")
    public ResponseEntity postComment(@Valid @PathVariable("content-id") @Positive long contentId,
                                          @RequestBody CommentDto.Post postRequest) {
        postRequest.setContentId(contentId);
        Comment comment = mapper.commentPostToComment(postRequest);
        Comment createComment = commentService.createComment(comment);

        return new ResponseEntity(new SingleResponseDto<>(mapper.commentToCommentResponseDto(createComment)), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/contents/{content-id}/comments/{comment-id}")
    public ResponseEntity patchComment(@Valid @PathVariable("content-id") @Positive long contentId,
                                        @PathVariable("comment-id") @Positive long commentId,
                                       @RequestBody CommentDto.Patch patchRequest) {
        patchRequest.setContentId(contentId);
        patchRequest.setCommentId(commentId);
        Comment comment = commentService.updateComment(mapper.commentPatchToComment(patchRequest));

        return new ResponseEntity(new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/comments/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping("/comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Comment> commentPage = commentService.findComments(page-1,size);
        List<Comment> comments = commentPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.commentListToCommentResponseDto(comments),commentPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
