package com.mainProject.server.domain.comment.controller;

import com.mainProject.server.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CemmentConroller {
    private final CommentService commentService;
}
