package com.mainProject.server.domain.content.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentResponseMinDto {
    private long contentId;
    private String contentTitle;
    private String contentScore;
    private String contentPoster;

}
