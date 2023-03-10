package com.mainProject.server.domain.content.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.entity.Ott;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.domain.member.service.MemberService;
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
    private final MemberService memberService;
    private final CustomBeanUtils<Content> beanUtils;

    @Transactional
    public Content createCrawlingContent(Content content) {
        Optional<Content> optionalContent = contentRepository.findByContentTitle(content.getContentTitle());

        if(optionalContent.isPresent()) {
            Content findContent = optionalContent.get();

            for(int i =0; i<findContent.getOttList().size(); i++) {
                if(findContent.getOttList().get(i).getOttName().equals(content.getContentOttName())) {
                    findContent.getOttList().get(i).setOttRank(content.getContentOttRank());
                    return contentRepository.save(findContent);
                }
            }

            Ott ott = new Ott();
            ott.setOttName(content.getContentOttName());
            ott.setOttRank(content.getContentOttRank());
            ott.setContent(findContent);

            findContent.getOttList().add(ott);

            return contentRepository.save(findContent);
        }

        content.setChoiceCount(0L);
        content.setDeprecateCount(0L);
        content.setRecommendCount(0L);
        content.setFavoriteCount(0L);

        return contentRepository.save(content);
    }

    public Content findContent(long contentId) {
        return findVerifiedContent(contentId);
    }

    public List<Content> findContents() {
        return contentRepository.findAll();}

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
