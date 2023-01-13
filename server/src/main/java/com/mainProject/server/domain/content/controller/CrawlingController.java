package com.mainProject.server.domain.content.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.CrawlingService;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/crawlings/contents")
@RequiredArgsConstructor
@Validated
public class CrawlingController {
    private final CrawlingService crawlingService;

    @PostMapping
    public void Crawling() {
        crawlingService.createCrawling("watcha-slide");
        //crawlingService.createCrawling("wavve-slide");
        //crawlingService.createCrawling("tving-slide");
    }

//    @Scheduled(fixedDelay = 86_400_000)
//    public void setCrawlingService() {
//        crawlingService.createCrawling("watcha-slide");
//        crawlingService.createCrawling("wavve-slide");
//        crawlingService.createCrawling("tving-slide");
//    }
}
