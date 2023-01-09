package com.mainProject.server.domain.content.mapper;

import com.mainProject.server.domain.content.dto.ContentDto;
import com.mainProject.server.domain.content.entity.Content;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContentMapper {
    Content contentPostToDtoToContent(ContentDto.Post postRequest);
    Content contentPatchDtoToQuestion(ContentDto.Patch patchRequest);
    ContentDto.Response contentToContentResponseDto(Content content);

    List<ContentDto.Response> ContentListToContentListResponseDto(List<Content> contentList);
}
