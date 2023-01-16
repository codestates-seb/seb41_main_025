package com.mainProject.server.domain.member.controller;


import com.mainProject.server.domain.member.dto.MemberDto;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.mapper.MemberMapper;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    // TODO POST
    @PostMapping
    public  ResponseEntity postMember(@RequestBody MemberDto.Post postRequest){
        Member memberForService = mapper.memberPostToMember(postRequest);
        Member memberForResponse = memberService.createMember(memberForService);
        MemberDto.Response response = mapper.memberToMemberResponse(memberForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Patch patchRequest){
        Member memberForService = mapper.memberPatchToMember(patchRequest);
        memberForService.setMemberId(memberId);
        Member memberForResponse = memberService.updateMember(memberForService);
        MemberDto.Response response = mapper.memberToMemberResponse(memberForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ONE
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId){
        Member memberForResponse = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(memberForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Member> memberPage = memberService.findMember(page -1, size);
        List<Member> members = memberPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                mapper.memberListToMemberResponseList(members), memberPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteOneMember(@PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
