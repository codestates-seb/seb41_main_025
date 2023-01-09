package com.mainProject.server.domain.choice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ChoiceResponseDto {
    private Long memberId;
    private Long contentId;
    private Boolean choiceSelected;
    private Long choiceCount;
    private LocalDateTime createdAt;
}
