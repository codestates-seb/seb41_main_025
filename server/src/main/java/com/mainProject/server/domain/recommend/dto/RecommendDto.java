package com.mainProject.server.domain.recommend.dto;

import com.mainProject.server.domain.content.dto.ContentResponseMinDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
public class RecommendDto {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class RecommendResponse {
        private Long recommendId;
        private long memberId;
        private long contentId;
        private Boolean recommendSelected;
        private Long recommendCount;
        private LocalDateTime createdAt;
        private ContentResponseMinDto contentResponseMinDto;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class DeprecateResponse {
        private Long deprecateId;
        private long memberId;
        private long contentId;
        private Boolean deprecateSelected;
        private Long deprecateCount;
        private LocalDateTime createdAt;
        private ContentResponseMinDto contentResponseMinDto;
    }

}

