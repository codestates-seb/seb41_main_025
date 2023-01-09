package com.mainProject.server.domain.member.dto;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.global.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
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
    @Setter
    @Getter
    public static class Patch {

        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;
        private String password;
        private String memberPicture;
        private String nickName;

    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private Long memberId;
        private String email;
        private String memberPicture;
        private String name;
        private String nickName;
    }
}

