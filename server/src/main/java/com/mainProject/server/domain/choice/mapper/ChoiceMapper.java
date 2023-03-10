package com.mainProject.server.domain.choice.mapper;

import com.mainProject.server.domain.choice.dto.ChoiceResponseDto;
import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.content.dto.ContentResponseMinDto;
import com.mainProject.server.domain.favorite.dto.FavoriteResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChoiceMapper {

    default ChoiceResponseDto choiceTochoiceResponseDto(Choice choice) {
        ChoiceResponseDto responseDto = ChoiceResponseDto.builder()
                .choiceId(choice.getChoiceId())
                .memberId(choice.getMember().getMemberId())
                .contentId(choice.getContent().getContentId())
                .choiceSelected(choice.getChoiceSelected())
                .choiceCount(choice.getContent().getChoiceCount())
                .createdAt(LocalDateTime.now())
                .build();

        return responseDto;

    }

    default List<ChoiceResponseDto> choicesToChoiceResponseDtos(List<Choice> choiceList) {
        List<ChoiceResponseDto> response = choiceList.stream()
                .map(choice -> {
                    ContentResponseMinDto contentResponseMinDto = ContentResponseMinDto.builder()
                    .contentId(choice.getContent().getContentId())
                            .contentScore(choice.getContent().getContentScore())
                            .contentPoster(choice.getContent().getContentPoster())
                            .contentTitle(choice.getContent().getContentTitle())
                            .build();
                    ChoiceResponseDto choiceResponseDto = choiceTochoiceResponseDto(choice);
                    choiceResponseDto.setContentResponseMinDto(contentResponseMinDto);
                    return choiceResponseDto;})
                .collect(Collectors.toList());

        return response;
    }
}
