package com.mainProject.server.domain.recommend.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import com.mainProject.server.domain.recommend.mapper.RecommendMapper;
import com.mainProject.server.domain.recommend.service.RecommendService;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
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

    @GetMapping("/members/{member-id}/recommend")
    public ResponseEntity getRecomend(@PathVariable("member-id") long memberId){
        Member curMember = memberService.getCurrentMember();
        if (curMember.getMemberId() == memberId) {

            List<Recommend> recommendList = recommendService.findRecommends(memberId);
            return new ResponseEntity(new SingleResponseDto<>(mapper.recommendsToRecommendDtos(recommendList)), HttpStatus.OK);
        } throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
    }

    @GetMapping("/members/{member-id}/deprecate")
    public ResponseEntity getDeprecate(@PathVariable("member-id") long memberId){
        Member curMember = memberService.getCurrentMember();
        if (curMember.getMemberId() == memberId) {

            List<Deprecate> deprecateList = recommendService.findDeprecates(memberId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.deprecatesToDeprecateResponseDtos(deprecateList)), HttpStatus.OK);
        } throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
    }

    @DeleteMapping("/recommend/{recommend-id}")
    public ResponseEntity deleteOneRecommend(@PathVariable("recommend-id") long recommendId) {
        recommendService.deleteRecommend(recommendId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/deprecate/{deprecate-id}")
    public ResponseEntity deleteOneDeprecate(@PathVariable("deprecate-id") long deprecateId) {
        recommendService.deleteDeprecate(deprecateId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
