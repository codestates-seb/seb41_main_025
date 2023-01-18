package com.mainProject.server.domain.member.controller;


import com.mainProject.server.domain.member.dto.MemberDto;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.mapper.MemberMapper;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
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

    @Autowired
    private PasswordEncoder encoder;

    // TODO POST
    @PostMapping
    public  ResponseEntity postMember(@Valid @RequestBody MemberDto.Post postRequest){
        Member memberForService = mapper.memberPostToMember(postRequest);
        Member memberForResponse = memberService.createMember(memberForService);
        MemberDto.Response response = mapper.memberToMemberResponse(memberForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(@Valid @RequestBody MemberDto.Reissue reissue) {
        // validation check
        memberService.reissue(reissue);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Valid @RequestBody MemberDto.Logout logout) {
        // validation check
        memberService.logout(logout);
        return new ResponseEntity<>("/members/login",HttpStatus.OK);
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
        Page<Member> memberPage = memberService.findMembers(page -1, size);
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


    @PostMapping("prevModify")
    public String postPrevModify(@Valid @RequestParam String pw, RedirectAttributes rttr) {
        String memberpw = memberService.getCurrentMember().getPassword();
        log.info("# memberpw = {}", memberpw);
        log.info("# pw = {}", pw);

//        if(encoder.matches(pw, memberpw)) {
        if(encoder.matches(pw, memberpw)) {
            log.info("pw 재확인 완료..");
            return "/members/"+memberService.getCurrentMember().getMemberId();
        }
        else {
            rttr.addFlashAttribute("msg", "비밀번호를 다시 확인해 주세요.");
            return "/members/prevModify";
        }
    }


}
