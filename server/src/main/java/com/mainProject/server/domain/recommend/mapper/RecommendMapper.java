package com.mainProject.server.domain.recommend.mapper;

import com.mainProject.server.domain.content.dto.ContentResponseMinDto;
import com.mainProject.server.domain.recommend.dto.RecommendDto;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface RecommendMapper {
    default RecommendDto.RecommendResponse recommendToRecommendDto(Recommend recommend) {
        // List<Content> contentList = recommend.getContent();
        RecommendDto.RecommendResponse responseDto =  RecommendDto.RecommendResponse.builder()
                .recommendId(recommend.getRecommendId())
                .memberId(recommend.getMember().getMemberId())
                .contentId(recommend.getContent().getContentId())
                .recommendSelected(recommend.getRecommendSelected())
                .recommendCount(recommend.getContent().getRecommendCount())
                .createdAt(LocalDateTime.now())
                .build();
        return responseDto;
    }

    default RecommendDto.DeprecateResponse deprecateToDeprecateResponseDto(Deprecate deprecate){
        RecommendDto.DeprecateResponse responseDto = RecommendDto.DeprecateResponse.builder()
                .deprecateId(deprecate.getDeprecatedId())
                .memberId(deprecate.getMember().getMemberId())
                .contentId(deprecate.getContent().getContentId())
                .deprecateSelected(deprecate.getDeprecatedSelected())
                .deprecateCount(deprecate.getContent().getDeprecateCount())
                .createdAt(LocalDateTime.now())
                .build();

        return responseDto;
    }

    default List<RecommendDto.RecommendResponse> recommendsToRecommendDtos(List<Recommend> recommendList) {
        List<RecommendDto.RecommendResponse> response =  recommendList.stream()
                .map(recommend -> {
                    ContentResponseMinDto contentResponseMinDto = ContentResponseMinDto.builder()
                            .contentId(recommend.getContent().getContentId())
                            .contentScore(recommend.getContent().getContentScore())
                            .contentTitle(recommend.getContent().getContentTitle())
                            .contentPoster(recommend.getContent().getContentPoster())
                            .build();
                    RecommendDto.RecommendResponse recommendResponseDto = recommendToRecommendDto(recommend);
                    recommendResponseDto.setContentResponseMinDto(contentResponseMinDto);
                    return recommendResponseDto;})
                .collect(Collectors.toList());
        return response;
    }

    default List<RecommendDto.DeprecateResponse> deprecatesToDeprecateResponseDtos(List<Deprecate> deprecateList) {
        List<RecommendDto.DeprecateResponse> response =  deprecateList.stream()
                .map(deprecate -> {
                    ContentResponseMinDto contentResponseMinDto = ContentResponseMinDto.builder()
                            .contentId(deprecate.getContent().getContentId())
                            .contentScore(deprecate.getContent().getContentScore())
                            .contentTitle(deprecate.getContent().getContentTitle())
                            .contentPoster(deprecate.getContent().getContentPoster())
                            .build();
                    RecommendDto.DeprecateResponse deprecateResponseDto = deprecateToDeprecateResponseDto(deprecate);
                    deprecateResponseDto.setContentResponseMinDto(contentResponseMinDto);
                    return deprecateResponseDto;})
                .collect(Collectors.toList());
        return response;
    }
}




