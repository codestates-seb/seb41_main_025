package com.mainProject.server.domain.content.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.mapper.ContentMapper;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/contents")
@RequiredArgsConstructor
@Validated
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper mapper;

    // TODO GET ONE
    @GetMapping("/{content-id}")
    public ResponseEntity getContent(@PathVariable("content-id") @Positive long contentId){
        Content content = contentService.findContent(contentId);
        return new ResponseEntity(
                new SingleResponseDto<>(mapper.contentToContentResponseDto(content)),HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getContents(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Content> contentPage = contentService.findContents(page - 1, size);
        List<Content> contents = contentPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.ContentListToContentListResponseDto(contents),contentPage), HttpStatus.OK);
    }


    // TODO DELETE ONE
    @DeleteMapping("/{content-id}")
    public ResponseEntity deleteContent(@PathVariable("content-id") @Positive long contentId) {
        contentService.deleteContent(contentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
