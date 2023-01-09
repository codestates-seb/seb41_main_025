package com.mainProject.server.domain.choice.mapper;

import com.mainProject.server.domain.choice.dto.ChoiceResponseDto;
import com.mainProject.server.domain.choice.entity.Choice;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public class ChoiceMapper {

    public ChoiceResponseDto choiceTochoiceResponseDto(Choice choice) {
        ChoiceResponseDto responseDto = ChoiceResponseDto.builder()
                .memberId(choice.getMember().getMemberId())
                .contentId(choice.getContent().getContentId())
                .choiceSelected(choice.getChoiceSelected())
                .choiceCount(choice.getContent().getChoiceCount())
                .build();

        return responseDto;

    }
}
