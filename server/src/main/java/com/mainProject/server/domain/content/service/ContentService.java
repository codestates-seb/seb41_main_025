package com.mainProject.server.domain.content.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final CustomBeanUtils<Content> beanUtils;

    @Transactional
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

    public Page<Content> findContents(int page, int size) {
        return contentRepository.findAll(PageRequest.of(page,size, Sort.by("contentId").descending()));}

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
