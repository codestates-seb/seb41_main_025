package com.mainProject.server.domain.favorite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class FavoriteResponseDto {
    private Long favoriteId;
    private long memberId;
    private long favoriteLimitTotal;
    private Long contentId;
    private Boolean favoriteSelected;
    private Long favoriteCount;
    private LocalDateTime createdAt;

}
