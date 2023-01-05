package com.mainProject.server.domain.content.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class ContentDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotBlank
        private String contentTitle;
        @NotBlank
        private String contentBody;
        private String contentPoster;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        @NotBlank
        private long contentId;
        @NotBlank
        private String contentTitle;
        @NotBlank
        private String contentBody;
        private String contentPoster;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long contentId;
        private String contentTitle;
        private String contentBody;
        private String contentPoster;
    }
}
