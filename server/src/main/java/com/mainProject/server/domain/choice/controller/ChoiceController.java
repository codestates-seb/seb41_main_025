package com.mainProject.server.domain.choice.controller;

import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.choice.mapper.ChoiceMapper;
import com.mainProject.server.domain.choice.service.ChoiceService;
import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChoiceController {
    private final MemberService memberService;
    private final ContentService contentService;
    private final ChoiceService choiceService;
    private final ChoiceMapper mapper;

    @PostMapping("/contents/{content-id}/choice")
    public ResponseEntity postChoice(@PathVariable("content-id") long contentId) {
        Member member = memberService.getCurrentMember();
        Content content = contentService.findContent(contentId);
        Choice choice = choiceService.pickChoice(member, content);

        return new ResponseEntity(new SingleResponseDto<>(mapper.choiceTochoiceResponseDto(choice)), HttpStatus.OK);
    }


}