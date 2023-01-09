package com.mainProject.server.domain.choice.repository;

import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    Optional<Choice> findByMemberAndContent(Member member, Content content);
}
