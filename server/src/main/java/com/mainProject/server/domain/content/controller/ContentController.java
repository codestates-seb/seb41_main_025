package com.mainProject.server.domain.content.controller;

import com.mainProject.server.domain.content.dto.ContentResponseDto;
import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.mapper.ContentMapper;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.global.response.DoubleResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contents")
@RequiredArgsConstructor
@Validated
@Slf4j
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper mapper;


    // TODO GET ONE
    @GetMapping("/{content-id}")
    public ResponseEntity getContent(@PathVariable("content-id") @Positive long contentId){
        Content content = contentService.findContent(contentId);
        ContentResponseDto responseDto = mapper.contentToContentResponseDto(content);
        List<String> ottList = Arrays.stream(responseDto.getContentOttList().split(" ")).collect(Collectors.toList());

        return new ResponseEntity(
                new DoubleResponseDto<>(responseDto, ottList),HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getContents() {
        List<Content> contents = contentService.findContents();
        return new ResponseEntity<>(new SingleResponseDto<>(
                mapper.ContentListToContentListResponseDto(contents)),HttpStatus.OK);
    }


    // TODO DELETE ONE
    @DeleteMapping("/{content-id}")
    public ResponseEntity deleteContent(@PathVariable("content-id") @Positive long contentId) {
        contentService.deleteContent(contentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
