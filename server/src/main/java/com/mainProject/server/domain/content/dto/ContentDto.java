package com.mainProject.server.domain.content.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


public class ContentDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        private String ottName;
        @NotBlank
        private String contentTitle;
        @NotBlank
        private String contentBody;
        private String contentPoster;
        private String contentRank;
        private String contentOpenAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private Long contentId;
        private String contentRank;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String ottName;
        private long contentId;
        private String contentTitle;
        private String contentBody;
        private String contentPoster;
        private String contentOpenAt;
    }
}
