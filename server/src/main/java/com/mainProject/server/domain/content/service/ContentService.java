package com.mainProject.server.domain.content.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final CustomBeanUtils<Content> beanUtils;

    public Content createContent(Content content) {
        VerifiedContentTitle(content.getContentTitle());

        return contentRepository.save(content);
    }


    public Content updateContent(Content content) {
        Content findContent = findVerifiedContent(content.getContentId());

        Content updateContent = beanUtils.copyNonNullProperties(content, findContent);
        return contentRepository.save(updateContent);

    }
    
    public Content findContent(long contentId) {
        return findVerifiedContent(contentId);
    }

    public List<Content> findContents() {return contentRepository.findAll();}

    public void deleteContent(long contentId) {
        Content findContent = findVerifiedContent(contentId);

        contentRepository.delete(findContent);
    }

    public Content findVerifiedContent(long contentId) {
        Optional<Content> optionalContent = contentRepository.findById(contentId);
        Content findContent =
                optionalContent.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND));

        return findContent;
    }

    private void VerifiedContentTitle(String contentTitle) {
        Optional<Content> optionalContent = contentRepository.findByContentTitle(contentTitle);
        if (optionalContent.isPresent())
           throw new BusinessLogicException(ExceptionCode.CONTENT_EXISTS);

    }


}
