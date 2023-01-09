package com.mainProject.server.global.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class LoginDto {
    @NotBlank(message = "공백일 수 없습니다.")
    private String email;
    @Size(min = 8, max = 20, message = "비밀번호 길이는 8 이상 20 이하여야 합니다.")
    private String password;
}
