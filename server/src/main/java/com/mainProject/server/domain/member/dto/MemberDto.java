package com.mainProject.server.domain.member.dto;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.global.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;
        @NotBlank(message = "회원 이름은 공백이 아니어야 합니다.")
        private String name;
        private String nickName;
        private String memberPicture;
    }
    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long memberId;
        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;
        private String password;
        private String memberPicture;
        private String nickName;

//        private Member.MemberStatus memberStatus;

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Response {
        private Long memberId;
        private String email;
        private String password;
        private String memberPicture;
        private String name;
        private String nickName;
//        private Member.MemberStatus memberStatus;
//        public String getMemberStatus() {
//            return memberStatus.getStatus();
//        }
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

