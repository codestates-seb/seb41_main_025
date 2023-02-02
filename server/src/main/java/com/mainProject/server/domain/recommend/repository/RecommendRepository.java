package com.mainProject.server.domain.recommend.repository;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.recommend.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecommendRepository extends JpaRepository<Recommend,Long> {
    Optional<Recommend> findByMemberAndContent(Member member, Content content);

}
