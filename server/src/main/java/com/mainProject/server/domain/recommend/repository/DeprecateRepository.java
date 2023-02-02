package com.mainProject.server.domain.recommend.repository;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeprecateRepository extends JpaRepository<Deprecate,Long> {
  Optional<Deprecate> findByMemberAndContent(Member member, Content content);
}
