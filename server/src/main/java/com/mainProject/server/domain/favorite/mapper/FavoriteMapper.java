package com.mainProject.server.domain.favorite.mapper;

import com.mainProject.server.domain.content.dto.ContentResponseMinDto;
import com.mainProject.server.domain.favorite.dto.FavoriteResponseDto;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    default List<FavoriteResponseDto> favoritesToFavoriteResponseDtos(List<Favorite> favoriteList) {
        //미니버전
        List<FavoriteResponseDto> response = favoriteList.stream()
                .map(favorite -> {
                    ContentResponseMinDto contentResponseMinDto = ContentResponseMinDto.builder()
                            .contentId(favorite.getContent().getContentId())
                            .contentScore(favorite.getContent().getContentScore())
                            .contentTitle(favorite.getContent().getContentTitle())
                            .contentPoster(favorite.getContent().getContentPoster())
                            .build();
                    FavoriteResponseDto favoriteResponseDto = favoriteTofavoriteResponseDto(favorite);
                    favoriteResponseDto.setContentResponseMinDto(contentResponseMinDto);
                    return favoriteResponseDto;})
                .collect(Collectors.toList());

        //풀버전
//        List<FavoriteResponseDto> response = favoriteList.stream()
//                .map(favorite -> {
//                    ContentResponseDto contentResponseDto = ContentResponseDto.builder()
//                            .contentOttName(favorite.getContent().getContentOttName())
//                            .contentOttRank(favorite.getContent().getContentOttRank())
//                            .contentId(favorite.getContent().getContentId())
//                            .contentOpenAt(favorite.getContent().getContentOpenAt())
//                            .contentGenre(favorite.getContent().getContentGenre())
//                            .contentCountry(favorite.getContent().getContentCountry())
//                            .contentGrade(favorite.getContent().getContentGrade())
//                            .contentScore(favorite.getContent().getContentScore())
//                            .contentRunningTime(favorite.getContent().getContentRunningTime())
//                            .contentAttendance(favorite.getContent().getContentAttendance())
//                            .contentTitle(favorite.getContent().getContentTitle())
//                            .contentBody(favorite.getContent().getContentBody())
//                            .contentPoster(favorite.getContent().getContentPoster())
//                            .build();
//                    FavoriteResponseDto favoriteResponseDto = favoriteTofavoriteResponseDto(favorite);
//                    favoriteResponseDto.setContentResponseDtoList(contentResponseDto);
//                    return favoriteResponseDto;})
//                .collect(Collectors.toList());

        return response;
    }
}
