package com.mainProject.server.domain.favorite.controller;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.service.ContentService;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.favorite.mapper.FavoriteMapper;
import com.mainProject.server.domain.favorite.service.FavoriteService;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
