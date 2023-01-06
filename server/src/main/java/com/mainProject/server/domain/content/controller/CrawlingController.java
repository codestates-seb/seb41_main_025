package com.mainProject.server.domain.content.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.CrawlingService;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contents/crawlings")
@RequiredArgsConstructor
@Validated
public class CrawlingController {
    private final CrawlingService crawlingService;
    @GetMapping
    public void postCrawling() {
        crawlingService.createCrawling();
    }
}