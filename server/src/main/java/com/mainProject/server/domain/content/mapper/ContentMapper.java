package com.mainProject.server.domain.content.mapper;

import com.mainProject.server.domain.content.dto.ContentResponseDto;
import com.mainProject.server.domain.content.entity.Content;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContentMapper {

    ContentResponseDto contentToContentResponseDto(Content content);

    List<ContentResponseDto> ContentListToContentListResponseDto(List<Content> contentList);
}
