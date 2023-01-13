package com.mainProject.server.domain.recommend.mapper;

import com.mainProject.server.domain.recommend.dto.RecommendDto;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface RecommendMapper {
    default RecommendDto.RecommendResponse recommendToRecommendDto(Recommend recommend) {
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
}




