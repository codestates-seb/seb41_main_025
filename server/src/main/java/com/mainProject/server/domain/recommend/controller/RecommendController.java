package com.mainProject.server.domain.recommend.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import com.mainProject.server.domain.recommend.mapper.RecommendMapper;
import com.mainProject.server.domain.recommend.service.RecommendService;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class RecommendController {
    private final MemberService memberService;
    private final ContentService contentService;
    private final RecommendService recommendService;
    private final RecommendMapper mapper;

    @PostMapping("/contents/{content-id}/recommend")
    public ResponseEntity postRecommend(@PathVariable("content-id") long contentId) {
        Member member = memberService.getCurrentMember();
        Content content = contentService.findContent(contentId);
        Recommend recommend = recommendService.pickRecommend(member, content);

        return new ResponseEntity(new SingleResponseDto<>(mapper.recommendToRecommendDto(recommend)), HttpStatus.OK);
    }

    @PostMapping("/contents/{content-id}/deprecate")
    public ResponseEntity postDeprecate(@PathVariable("content-id") long contentId){
        Member member = memberService.getCurrentMember();
        Content content = contentService.findContent(contentId);
        Deprecate deprecate = recommendService.pickDeprecate(member, content);

        return new ResponseEntity(new SingleResponseDto<>(mapper.deprecateToDeprecateResponseDto(deprecate)), HttpStatus.OK);
    }
    @GetMapping("/recomend/{recommend-id}")
    public ResponseEntity getRecomend(@PathVariable("recommend-id") long recommendId){
        Recommend recommend = recommendService.findRecommend(recommendId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.recommendToRecommendDto(recommend)), HttpStatus.OK);
    }

    @GetMapping("/deprecate/{deprecate-id}")
    public ResponseEntity getDeprecate(@PathVariable("deprecate-id") long deprecateId){
        Deprecate deprecate = recommendService.findDeprecate(deprecateId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.deprecateToDeprecateResponseDto(deprecate)), HttpStatus.OK);
    }
}
