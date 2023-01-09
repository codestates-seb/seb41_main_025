package com.mainProject.server.domain.choice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ChoiceResponseDto {
    private long memberId;
    private long contentId;
    private Boolean choiceSelected;
    private Long choiceCount;
}
