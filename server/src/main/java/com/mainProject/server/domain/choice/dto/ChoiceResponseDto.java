package com.mainProject.server.domain.choice.dto;

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
public class ChoiceResponseDto {
    private Long choiceId;
    private long memberId;
    private long contentId;
    private ContentResponseMinDto contentResponseMinDto;
    private Boolean choiceSelected;
    private Long choiceCount;
    private LocalDateTime createdAt;
}
