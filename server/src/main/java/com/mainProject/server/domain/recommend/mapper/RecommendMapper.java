package com.mainProject.server.domain.recommend.mapper;

public interface RecommendMapper {
    default RecommendDto.RecommendResponse recommendToRecommrndDto(Recommend recommend) {
        RecommendDto.RecommendResponse responseDto =  RecommendDto.RecommendResponse.builder()
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
                .memberId(deprecate.getMember().getMemberId())
                .contentId(deprecate.getContent().getContentId())
                .deprecateSelected(deprecate.getDeprecatedSelected())
                .deprecateCount(deprecate.getContent().getDeprecateCount())
                .createdAt(LocalDateTime.now())
                .build();

        return responseDto;
    }
}




