package com.mainProject.server.domain.member.dto;

import com.mainProject.server.global.validator.NotSpace;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
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
    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
    }

    @Getter
    @Setter
    public static class Reissue {
        @NotEmpty(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotEmpty(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class Logout {
        @NotEmpty(message = "잘못된 요청입니다.")
        private String accessToken;

        @NotEmpty(message = "잘못된 요청입니다.")
        private String refreshToken;
    }

    @AllArgsConstructor
    @Setter
    @Getter
    public static class Patch {

        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;
        private String memberPicture;
        private String password;
        private String nickName;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    public static class PrevModify {
        @NotSpace(message = "비밀 번호는 공백이 아니어야 합니다")
        private String password;
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
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}

