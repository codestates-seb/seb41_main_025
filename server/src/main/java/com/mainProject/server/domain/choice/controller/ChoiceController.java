package com.mainProject.server.domain.choice.controller;

import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.choice.mapper.ChoiceMapper;
import com.mainProject.server.domain.choice.service.ChoiceService;
import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
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
public class ChoiceController {
    private final ContentRepository contentRepository;
    private final MemberService memberService;
    private final ContentService contentService;
    private final ChoiceService choiceService;
    private final ChoiceMapper mapper;

    @PostMapping("/contents/{content-id}/choice")
    public ResponseEntity postChoice(@PathVariable("content-id") long contentId) {
        Member member = memberService.getCurrentMember();
        Content content = contentService.findContent(contentId);
        Choice choice = choiceService.pickChoice(member, content);
        log.info("# choice.getId = {}" , choice.getChoiceId());

        return new ResponseEntity(new SingleResponseDto<>(mapper.choiceTochoiceResponseDto(choice)), HttpStatus.OK);
    }

    @GetMapping("/choice/{choice-id}")
    public ResponseEntity getChoice(@PathVariable("choice-id") long choiceId){
        Choice choice = choiceService.findChoice(choiceId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.choiceTochoiceResponseDto(choice)), HttpStatus.OK);
    }

    // 멤버 아이디에 해당하는 choice 정보들 출력
    //Service의 findChoice 수정 필요
    @GetMapping("/members/{member-id}/choice")
    public ResponseEntity getALLChoice(@PathVariable("member-id") long memberId){
        Member curMember = memberService.getCurrentMember();
        if(curMember.getMemberId() == memberId) {
            List<Choice> choiceList = choiceService.findChoices(memberId);
            return new ResponseEntity(new SingleResponseDto<>(mapper.choicesToChoiceResponseDtos(choiceList)), HttpStatus.OK);
        } throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
    }

    @DeleteMapping("/choice/{choice-id}")
    public ResponseEntity deleteOneChoice(@PathVariable("choice-id") long choiceId) {
        choiceService.deleteChoice(choiceId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
