package com.mainProject.server.domain.member.mapper;

import com.mainProject.server.domain.member.dto.MemberDto;
import com.mainProject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post postRequest);
    Member memberPatchToMember(MemberDto.Patch patchRequest);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> memberListToMemberResponseList(List<Member> memberList);
}
