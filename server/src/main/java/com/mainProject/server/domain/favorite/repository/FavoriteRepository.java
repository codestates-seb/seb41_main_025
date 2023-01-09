package com.mainProject.server.domain.favorite.repository;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByMemberAndContent(Member member, Content content);
}
