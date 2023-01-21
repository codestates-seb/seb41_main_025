package com.mainProject.server.domain.comment.dto;

import lombok.*;

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
    @NoArgsConstructor
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
    @Builder
    public static class Response{
        private long commentId;
        private String commentBody;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String nickName;
        private String memberPicture;
        private Long contentId;
        private Long memberId;
    }
}
