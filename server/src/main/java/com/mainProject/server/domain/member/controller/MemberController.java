package com.mainProject.server.domain.member.controller;


import com.mainProject.server.domain.member.dto.MemberDto;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.mapper.MemberMapper;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import com.mainProject.server.global.upload.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    private S3UploadService s3UploadService;

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
        reissue.setAccessToken(reissue.getAccessToken().replace("Bearer ",""));
        MemberDto.TokenInfo tokenInfo = memberService.reissue(reissue);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer " +tokenInfo.getAccessToken());
        headers.set("RefreshToken",tokenInfo.getRefreshToken());
        return new ResponseEntity<>(headers,HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Valid @RequestBody MemberDto.Logout logout) {
        // validation check
        logout.setAccessToken(logout.getAccessToken().replace("Bearer ",""));
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

    @PostMapping("/upload")
    public ResponseEntity upload(@RequestBody MultipartFile memberPicture) throws IOException {
        String memberPictureUrl = s3UploadService.upload(memberPicture, "image");
        return new ResponseEntity(new SingleResponseDto<>((memberPictureUrl)), HttpStatus.OK);
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

    @PostMapping("/prevModify")
    public ResponseEntity postPrevModify(@Valid @RequestBody MemberDto.PrevModify prevRequest) {
        log.info("## prevModify = {}", prevRequest);
        boolean check = memberService.prevModify(memberService.getCurrentMember().getPassword(), prevRequest.getPassword());
        if(check){
            log.info("pw 재확인 완료");
            return new ResponseEntity(HttpStatus.OK);
        }else{
            log.info("pw 재확인 필요");
            return  new ResponseEntity(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
    }
}
