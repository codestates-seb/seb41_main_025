package com.mainProject.server.domain.favorite.service;

import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.favorite.repository.FavoriteRepository;

import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.content.entity.Content;

import com.mainProject.server.domain.member.repository.MemberRepository;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteService {
    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;
    private final ContentRepository contentRepository;
    private final MemberService memberService;

    @Transactional
    public Favorite pickFavorite(Member member, Content content){
        Favorite favorite = findByMemberAndContent(member, content);
        favorite.setMember(member);
        favorite.setContent(content);


        if(0 <= member.getFavoriteLimitTotal() && member.getFavoriteLimitTotal() < 3/*멤버의 인생영화가 3보다 작을경우*/){
            // 인생영화가 3개 미만인 경우 추가 가능
            if(favorite.getFavoriteSelected() != Boolean.TRUE){
                favorite.setFavoriteSelected(Boolean.TRUE);
                favorite.setFavoriteLimit(favorite.getFavoriteLimit() +1);
                member.setFavoriteLimitTotal(member.getFavoriteLimitTotal()+1);
                content.setFavoriteCount(content.getFavoriteCount()+1);
            }else{
                favorite.setFavoriteSelected(Boolean.FALSE);
                favorite.setFavoriteLimit(favorite.getFavoriteLimit() -1);
                member.setFavoriteLimitTotal(member.getFavoriteLimitTotal()-1);
                content.setFavoriteCount(content.getFavoriteCount()-1);
            }
        } else{
            // 인생영화를 3개 모두 선택한 경우(선택하지 않은 것을 추가할 경우 Exception/선택한 것일 경우 취소
            if(favorite.getFavoriteSelected() == Boolean.TRUE){
                favorite.setFavoriteSelected(Boolean.FALSE);
                favorite.setFavoriteLimit(favorite.getFavoriteLimit() -1);
                member.setFavoriteLimitTotal(member.getFavoriteLimitTotal()-1);
                content.setFavoriteCount(content.getFavoriteCount()-1);
            }else{
                throw new BusinessLogicException(ExceptionCode.FAVORITE_FULL_ALREADY);
            }
        }
        memberRepository.save(member);
        contentRepository.save(content);
        favoriteRepository.save(favorite);

        return favorite;
    }

    public Favorite findByMemberAndContent(Member member, Content content){
        Optional<Favorite> optionalFavorite = this.favoriteRepository.findByMemberAndContent(member, content);

        if(optionalFavorite.isPresent()){
            return optionalFavorite.get();
        }else{
            return new Favorite();
        }
    }
    public List<Favorite> findFavorites(long memberId){

        return favoriteRepository.findAll().stream()
                .filter(favorite -> favorite.getMember().getMemberId() == memberId)
                .filter( x -> x.getFavoriteSelected() == Boolean.TRUE)
                .collect(Collectors.toList());
    }

    public Favorite findVerifiedFavorite(long favoriteId){
        Optional<Favorite> optionalFavorite = favoriteRepository.findById(favoriteId);
        Favorite findFavorite
                = optionalFavorite.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FAVORITE_NOT_FOUND));
        return findFavorite;
    }

    public void deleteFavorite(long favoriteId) {
        Favorite findFavorite = findVerifiedFavorite(favoriteId);
        Member findMember = memberService.findVerifiedMember(findFavorite.getMember().getMemberId());

        if (memberService.getCurrentMember().getMemberId() != findMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        findMember.setFavoriteLimitTotal(findMember.getFavoriteLimitTotal() -1);

        memberRepository.save(findMember);
        favoriteRepository.delete(findFavorite);
    }
}
