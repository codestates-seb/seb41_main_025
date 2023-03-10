package com.mainProject.server.domain.member.service;

import com.mainProject.server.domain.member.dto.MemberDto;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    public MemberDto.TokenInfo reissue (MemberDto.Reissue reissue) {
        // 1. Refresh Token ??????
        if (!jwtTokenizer.validateToken(reissue.getRefreshToken())) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_ALLOW);
        }
        // 2. Access Token ?????? User email ??? ???????????????.
        Authentication authentication = jwtTokenizer.getAuthentication(reissue.getAccessToken());

        // 3. Redis ?????? User email ??? ???????????? ????????? Refresh Token ?????? ???????????????.
        String refreshToken = (String)redisTemplate.opsForValue().get(authentication.getName());

        // (??????) ?????????????????? Redis ??? RefreshToken ??? ???????????? ?????? ?????? ??????
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        }
        if(!refreshToken.equals(reissue.getRefreshToken())){
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_EQUAL);
        }

        // 4. ????????? ?????? ??????
        MemberDto.TokenInfo tokenInfo = jwtTokenizer.generateToken(authentication);

        // 5. RefreshToken Redis ????????????
        redisTemplate.opsForValue()
                .set(authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return tokenInfo;
    }
    public void logout(MemberDto.Logout logout) {
        // 1. Access Token ??????
        log.info("## logout.getAccessToken = {}",logout.getAccessToken());

        if (!jwtTokenizer.validateToken(logout.getAccessToken())) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_ALLOW);
        }
        // 2. Access Token ?????? User email ??? ???????????????.
        Authentication authentication = jwtTokenizer.getAuthentication(logout.getAccessToken());

        // 3. Redis ?????? ?????? User email ??? ????????? Refresh Token ??? ????????? ????????? ?????? ??? ?????? ?????? ???????????????.
        if (redisTemplate.opsForValue().get(authentication.getName()) != null) {
            // Refresh Token ??????
            redisTemplate.delete(authentication.getName());
        }

        // 4. ?????? Access Token ???????????? ????????? ?????? BlackList ??? ????????????
        Long expiration = jwtTokenizer.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        if(getCurrentMember().getMemberId() != findMember.getMemberId())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);

        Member updateMember = beanUtils.copyNonNullProperties(member, findMember);

        String encryptPassword = passwordEncoder.encode(updateMember.getPassword());
        updateMember.setPassword(encryptPassword);

        return memberRepository.save(updateMember);
    }

    public boolean prevModify(String memberPw, String prePw) {

        if(passwordEncoder.matches(prePw, memberPw)) {
            log.info("pw ????????? ??????.. !!!!");
            return true;
        }
        else {
            return false;
        }
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        if (getCurrentMember().getEmail().equals("admin@gmail.com")) {
            memberRepository.delete(findMember);
        } else if (getCurrentMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);
        } else {
            memberRepository.delete(findMember);
        }
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

        log.info("# ?????? ????????? ={}",member.getMemberId());

        return member;
    }
}
