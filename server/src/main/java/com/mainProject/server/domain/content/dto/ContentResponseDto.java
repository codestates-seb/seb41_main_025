package com.mainProject.server.domain.content.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContentResponseDto {

    private String contentOttName;
    private String ottRank;
    private long contentId;
    private String contentTitle;
    private String contentBody;
    private String contentPoster;

    private Long choiceCount;
    private Long recommendCount;
    private Long deprecateCount;
    private Long favoriteCount;


}
