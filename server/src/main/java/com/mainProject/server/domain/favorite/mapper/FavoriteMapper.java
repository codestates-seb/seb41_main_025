package com.mainProject.server.domain.favorite.mapper;

import com.mainProject.server.domain.favorite.dto.FavoriteResponseDto;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FavoriteMapper {
    default FavoriteResponseDto favoriteTofavoriteResponseDto(Favorite favorite) {
        FavoriteResponseDto responseDto = FavoriteResponseDto.builder()
                .favoriteId(favorite.getFavoriteId())
                .memberId(favorite.getMember().getMemberId())
                .favoriteLimitTotal(favorite.getMember().getFavoriteLimitTotal())
                .contentId(favorite.getContent().getContentId())
                .favoriteSelected(favorite.getFavoriteSelected())
                .favoriteCount(favorite.getContent().getFavoriteCount())
                .createdAt(LocalDateTime.now())
                .build();

        return responseDto;
    }
}
