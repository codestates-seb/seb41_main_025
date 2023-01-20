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
    private String contentOttRank;
    private long contentId;
    private String contentOpenAt; // 개봉 0
    private String contentGenre; // 장르 1
    private String contentCountry; // 국가 2
    private String contentGrade; // 등급 3
    private String contentScore; // 평점 5
    private String contentRunningTime; // 러닝타임 4
    private String contentAttendance; // 누적관객 6
    private String contentTitle;
    private String contentBody;
    private String contentPoster;

    private Long choiceCount;
    private Long recommendCount;
    private Long deprecateCount;
    private Long favoriteCount;

    }
