package com.mainProject.server.domain.content.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


public class ContentDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private String ottName;
        private String ottRank;
        private long contentId;
        private String contentTitle;
        private String contentBody;
        private String contentPoster;
        private String contentOpenAt;
        private Long choiceCount;
    }
}
