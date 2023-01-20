package com.mainProject.server.domain.favorite.dto;

import com.mainProject.server.domain.content.dto.ContentResponseMinDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
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
    private ContentResponseMinDto contentResponseMinDto;

}
