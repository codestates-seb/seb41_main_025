package com.mainProject.server.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class Post{
        @NotBlank
        private long contentId;
        @NotBlank
        private String commentBody;
    }

    @AllArgsConstructor
    @Setter
    @Getter
    public static class Patch{
        @NotBlank
        private long commentId;
        @NotBlank
        private long contentId;
        @NotBlank
        private String commentBody;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long commentId;
        private String commentBody;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long memberId;
        private Long contentId;
    }
}
