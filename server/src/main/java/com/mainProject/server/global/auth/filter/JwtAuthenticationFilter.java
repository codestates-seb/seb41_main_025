package com.mainProject.server.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainProject.server.domain.member.dto.MemberDto;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //(1)
    //public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
//    //(2)
    private final AuthenticationManager authenticationManager;

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);

        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // (추가) Redis 에 해당 accessToken logout 여부 확인
            String isLogout = (String)redisTemplate.opsForValue().get(token);
            if (ObjectUtils.isEmpty(isLogout)) {
                // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
    //(3)
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {//(3-1)
        //(3-2)
        ObjectMapper objectMapper = new ObjectMapper();
        MemberDto.Login loginDto = objectMapper.readValue(request.getInputStream(), MemberDto.Login.class);

        log.info("loginDto email ={}", loginDto.getEmail());
        log.info("loginDto pw ={}", loginDto.getPassword());
        //(3-3)
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {
        Member member = (Member) authResult.getPrincipal();  // (4-1)
        log.info("member = {}", member);


//        String accessToken = delegateAccessToken(member);   // (4-2)
//        String refreshToken = delegateRefreshToken(member); // (4-3)

//        response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
//        response.setHeader("Refresh", refreshToken);                   // (4-5)
    }
//    // (5)
//    private String delegateAccessToken(Member member) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", member.getEmail());
//        claims.put("roles", member.getRoles());
//
//        String subject = member.getEmail();
//        long expiration = jwtTokenProvider.getACCESS_TOKEN_EXPIRE_TIME();
//
//        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenProvider.getSecretKey());
//
//        String accessToken = jwtTokenProvider.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
//
//        return accessToken;
//    }
//
//    // (6)
//    private String delegateRefreshToken(Member member) {
//        String subject = member.getEmail();
//        Date expiration = jwtTokenProvider.getTokenExpiration(jwtTokenProvider.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String refreshToken = jwtTokenProvider.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
//
//        return refreshToken;
//    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            log.info("## token is what ={}",bearerToken.split(" ")[1].trim());
            return bearerToken.split(" ")[1].trim();
        }
        return null;
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
