package com.mainProject.server.domain.favorite.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.favorite.mapper.FavoriteMapper;
import com.mainProject.server.domain.favorite.service.FavoriteService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class FavoriteController {
    private final MemberService memberService;
    private final ContentService contentService;
    private final FavoriteService favoriteService;
    private final FavoriteMapper mapper;

    @PostMapping("/contents/{content-id}/favorite")
    public ResponseEntity postFavorite(@PathVariable("content-id") long contentId) {
        Member member = memberService.getCurrentMember();
        Content content = contentService.findContent(contentId);
        Favorite favorite = favoriteService.pickFavorite(member,content);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.favoriteTofavoriteResponseDto(favorite)), HttpStatus.OK);
    }

    @GetMapping("/members/{member-id}/favorite")
    public ResponseEntity getFavorite( @PathVariable("member-id") long memberId){
        Member curMember = memberService.getCurrentMember();
        if(curMember.getMemberId() == memberId) {
            List<Favorite> favoriteList = favoriteService.findFavorites(memberId);
            return new ResponseEntity(new SingleResponseDto<>(mapper.favoritesToFavoriteResponseDtos(favoriteList)), HttpStatus.OK);
        } throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
    }
    @DeleteMapping("/favorite/{favorite-id}")
    public ResponseEntity deleteOneFavorite(@PathVariable("favorite-id") long favoriteId) {
        favoriteService.deleteFavorite(favoriteId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
