package com.mainProject.server.domain.member.service;

import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.repository.MemberRepository;
import com.mainProject.server.global.auth.authority.CustomAuthorityUtils;
import com.mainProject.server.global.auth.jwt.JwtTokenizer;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate redisTemplate;


    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        return memberRepository.save(member);
    }

    public void reissue (MemberDto.Reissue reissue) {
        // 1. Refresh Token 검증
        if (!jwtTokenizer.validateToken(reissue.getRefreshToken())) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_ALLOW);
        }
        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenizer.getAuthentication(reissue.getAccessToken());

        // 3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String refreshToken = (String)redisTemplate.opsForValue().get(authentication.getName());

        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }
        if(!refreshToken.equals(reissue.getRefreshToken())){
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_EQUAL);
        }

        // 4. 새로운 토큰 생성
        MemberDto.TokenInfo tokenInfo = jwtTokenizer.generateToken(authentication);

        // 5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set(authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
    }
    public void logout(MemberDto.Logout logout) {
        // 1. Access Token 검증
        log.info("## logout.getAccessToken = {}",logout.getAccessToken());

        if (!jwtTokenizer.validateToken(logout.getAccessToken())) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_ALLOW);
        }
        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenizer.getAuthentication(logout.getAccessToken());

        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get(authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete(authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenizer.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        if(getCurrentMember().getMemberId() != findMember.getMemberId())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);

        Member updateMember = beanUtils.copyNonNullProperties(member, findMember);
// 오 뭔가 눌렀는데 오류가 잠깐 사라진거 같아요
        return memberRepository.save(updateMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        if(getCurrentMember().getMemberId() != findMember.getMemberId())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member getCurrentMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousUser"))
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);

        Optional<Member> optionalMember = memberRepository.findByEmail(authentication.getName());
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        log.info("# 현재 사용자 ={}",member.getMemberId());

        return member;
    }
}
