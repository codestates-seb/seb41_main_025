//package com.mainProject.server.global.auth.userDetails;
//
//
//import com.mainProject.server.domain.member.dto.MemberRequestDto;
//import com.mainProject.server.domain.member.dto.Response;
//import com.mainProject.server.global.auth.authority.Helper;
//import com.mainProject.server.global.auth.jwt.JwtTokenProvider;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.validation.Errors;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@Slf4j
//@RequiredArgsConstructor
//@RequestMapping("/api/users")
//@RestController
//public class MemberDetailController {
//
//    private final JwtTokenProvider jwtTokenProvider;
//    private final MemberDetailsService memberDetailsService;
//    private final Response response;
//
///*
//
//    @PostMapping("/sign-up")
//    public ResponseEntity<?> signUp(@Validated MemberRequestDto.SignUp signUp, Errors errors) {
//        // validation check
//        if (errors.hasErrors()) {
//            return response.invalidFields(Helper.refineErrors(errors));
//        }
//        return UsersService.signUp(signUp);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@Validated MemberRequestDto.Login login, Errors errors) {
//        // validation check
//        if (errors.hasErrors()) {
//            return response.invalidFields(Helper.refineErrors(errors));
//        }
//        return UsersService.login(login);
//    }
//
//
//    @PostMapping("/reissue")
//    public ResponseEntity<?> reissue(@Validated  MemberRequestDto.Reissue reissue, Errors errors) {
//        // validation check
//        if (errors.hasErrors()) {
//            return response.invalidFields(Helper.refineErrors(errors));
//        }
//        return UsersService.reissue(reissue);
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(@Validated  MemberRequestDto.Logout logout, Errors errors) {
//        // validation check
//        if (errors.hasErrors()) {
//            return response.invalidFields(Helper.refineErrors(errors));
//        }
//        return UsersService.logout(logout);
//    }
//
//    @GetMapping("/authority")
//    public ResponseEntity<?> authority() {
////        log.info("ADD ROLE_ADMIN");
//        return UsersService.authority();
//    }
//
//    @GetMapping("/userTest")
//    public ResponseEntity<?> userTest() {
////        log.info("ROLE_USER TEST");
//        return response.success();
//    }
//
//    @GetMapping("/adminTest")
//    public ResponseEntity<?> adminTest() {
////        log.info("ROLE_ADMIN TEST");
//        return response.success();
//    }
//}
