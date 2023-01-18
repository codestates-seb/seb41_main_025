//package com.mainProject.server.global.auth.jwt;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.io.Encoders;
//import io.jsonwebtoken.security.Keys;
//import lombok.Getter;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//import java.security.Key;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.Map;
//
//@Component
//public class JwtTokenizer {
//    // (1)
//    @Getter @Value("${jwt.key}")
//    private String secretKey;
//    @Getter @Value("${jwt.access-token-expiration-minutes}")
//    private int accessTokenExpirationMinutes;
//    @Getter @Value("${jwt.refresh-token-expiration-minutes}")
//    private int refreshTokenExpirationMinutes;
//
//
//    // (2)
//    public String encodeBase64SecretKey(String secretKey) {
//        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
//    }
//
//    // (3)
//    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
//        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
//        Key key = Keys.hmacShaKeyFor(keyBytes);
//
//        return key;
//    }
//
//    // (4)
//    public String generateAccessToken(Map<String, Object> claims,
//                                      String subject,
//                                      Date expiration,
//                                      String base64EncodedSecretKey) {
//        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(Calendar.getInstance().getTime())
//                .setExpiration(expiration)
//                .signWith(key)
//                .compact();
//    }
//
//    // (5)
//    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
//        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
//
//        return Jwts.builder()
//                .setSubject(subject)
//                .setIssuedAt(Calendar.getInstance().getTime())
//                .setExpiration(expiration)
//                .signWith(key)
//                .compact();
//    }
//
//    // (6)
//    public void verifySignature(String jws, String base64EncodedSecretKey) {
//        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
//
//        Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(jws);
//    }
//
//    //(7)
//    public Jws<Claims> getClaims(String jws,String base64EncodedSecretKey) {
//        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);
//
//        Jws<Claims> claims = Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(jws);
//
//        return claims;
//    }
//
//    //(8)
//    public Date getTokenExpiration(int expirationMinutes) {
//        Calendar calendar = Calendar.getInstance();
//        calendar.add(Calendar.MINUTE, expirationMinutes);
//        Date expiration = calendar.getTime();
//
//        return expiration;
//    }
//    private Claims parseToken(String token) {
//        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(this.secretKey));
//        String jws = token.replace("Bearer ", "");
//
//        return Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(jws)
//                .getBody();
//    }
//
//    /*public Long getMemberId(String token) {
//        return parseToken(token).get("memberId", Long.class);
//    }*/
//}
//
//
///*
//# JwtTokenizer 전체 개요
//- 역할
//1. Secret Key Encoding
//2. Secret Key For JWT Encoding
//3. AccessToken 생성
//4. RefreshToken 생성
//5. VerifySignature
//
//## 상세 설명
//- (1)
//: JWT 를 생성할 때 사용되는 `Secret Key`, `Expiration` 정보를 저장하는 필드
//: 외부에서 제공받는 데이터로 필드들을 채우도록 설정
//: 현재는 .yml 을 이용하여 로컬 환경 변수에서 제공하도록 설정됨
//: 학습 용도의 필드라고 생각함
//
//- (2)
//: 버전업 된 jjwt 에서는 Plain Text 상태의 문자열 것을 권장하지 않음.
//: 때문에 Secret Key 가 Plain Text(String) 상태로 유지되지 않도록 하기위한 메서드
//: 가벼운(?) 암호화 방법으로 암호화하는 메서드
//: 다른 객체로부터 암호를 전달받을때, 암호화할 수 있도록 외부에서 사용되는 메서드
//
//- (3)
//: (2)의 메서드로 암호화된 Secret Key 를 복호화하고, 이를 복잡한 알고리즘으로 암호화하는 메서드
//: 실제로 JWT 에 사용될 Secret Key 를 만드는 메서드
//: (2)의 메서드로 암호화된 Secret Key 를 실제 Key 객체로 만들어주며 내부에서만 사용되는 메서드
//
//- (4)
//: AccessToken 을 만드는 메서드
//: (2)을 통해 만들어진 Secret Key 를 제공받은 후, (3)의 메서드를 이용해서 JWT 에 사용될 Secret Key 를 만듬
//: 사용자의 정보(Claims), JWT 제목(Subject), JWT 발행 일자(IssuedAt), JWT 만료 일자(Expiration), Secret Key 서명(.signWith()) 등을 builder 패턴을 이용하여 JWT 를 생성
//
//- (5)
//: RefreshToken 을 만드는 메서드
//: (4)과 거의 같지만, RefreshToken 에는 사용자의 정보(Claims)가 필요없으므로 제외
//
//- (6)
//: 로그인 시 제공받은 JWT 를 검증하는 메서드
//: jws 란 String 형식의 JWT 라는 의미의 키워딩
//: 제공받은 JWT 의 Secret Key 와 내부에 존재하는 Secret Key((1)으로 인코딩된 Secret Key)와 비교하여 참과 거짓 판별하는 원리
//
//- (7)
//: 로그인 시 제공받은 JWT 에서 사용자 정보(Claims)를 추출하는 메서드
//: jws 란 String 형식의 JWT 라는 의미의 키워딩
//: (6)메서드와 완전히 똑같지만 (6)메서드는 void 반환형을 설정하여 검증의 목적을 두었다면, (7)메서드는 Jws<Claims>를 반환
//
//- (8)
//: JWT 만료 기간을 생성하는 메소드
//: JWT 생성 시, 인자로 제공해야하는 만료 기간을 생성해주는 메소드
//: Calender 객체를 생성하고, 해당 객체에 주어진 인자(int)를 분(MINUTES) 단위의 만료기간으로 정보를 설정한다. 그리고 이를 Date 객체로 반환하는 메소드
// */
