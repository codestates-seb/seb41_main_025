package com.mainProject.server.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.auth.dto.LoginDto;
import com.mainProject.server.global.auth.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //(1)
    //(2)
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate redisTemplate;

    //(3)
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {//(3-1)
        //(3-2)
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        //(3-3)
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    //(4)
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException{
        Member member = (Member) authResult.getPrincipal(); //(4-1)
        //(4-2)
        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);
        //(4-3)
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);


        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    //(5)
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("memberId", member.getMemberId());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration((int) jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    //(6)
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration((int) jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        //레디스에 리프레쉬토큰 저장하는 후보자리 1
        redisTemplate.opsForValue()
                .set(member.getEmail(), refreshToken, jwtTokenizer.getRefreshTokenExpirationMinutes(), TimeUnit.MINUTES);

        return refreshToken;
    }
}

/*
# 전체 개요


## 부분 설명
- (1)
: `UsernamePasswordAuthenticationFilter`을 상속받아 JWT 을 활용하기 적합한 Filter 로 Custom

- (2)
: 로그인 인증 처리 작업을 Spring Security 가 자동으로 처리할 수 있도록 `AuthenticationManager`를 DI
:

- (3)
: Override 을 통해 Custom 하는 메서드
: Client 와의 연결을 위해서 `HttpServletRequest`와 `HttpServletResponse`를 인자로 제공
: reading JSON 과 writing JSON 을 매핑하는 Mapper 인 ObjectMapper 를 활용
: Spring Security Filter 에서 사용할 수 있게끔 LoginDto 를 활용
: `UsernamePasswordAuthenticationToken`을 생성하여 `AuthenticationManager`에게 전달

- (3-1)
: `HttpServletRequest`와 `HttpServletResponse`를 인자로 제공받음으로써 Client 와 연결된 상태로 사용하는 부분

- (3-2)
: ObjectMapper 를 이용하여 Spring Security Filter 내에서 사용될 수 있는 형태(LoginDto)로 변환
: `HttpServletRequest.getInputStream()`은 Client 에서 넘겨주는 request 를 받는 부분.
//해당 부분에서 RuntimeException 을 잡아줘야 하기 때문에 @SneakyThrows 애너테이션을 사용함. try-catch 로 잡아도 됨.

- (3-3)
: `UsernamePasswordAuthenticationToken`은 Authentication(인증서)의 구현체이다.
: 실질적으로 Spring Security Filter 내부에서 name, password 등의 정보를 저장하고 돌아다는 객체

- (4)
: Override 을 통해 Custom 하는 메서드
: 로그인 인증에 성공했을 경우에 Authentication(인증서)에 저장된 회원 정보(Member)를 통해 JWT(String)를 만들고 이를 response header 에 추가하는 메서드

- (4-1)
: Authentication(인증서)의 Principal 에 Member 객체(정보)가 저장되어 있다.
- (4-2)
: JWT(String)을 만드는 부분
- (4-3)
: Response Header 에 내용을 추가하는 부분

- (5), (6)
: JwtTokenizer 클래스를 이용하여 준비된 재료들로 Token 을 만드는 메서드
: (5), (6)의 차이는 Member 의 정보인 Claims 의 유무의 차이이다.
 */
