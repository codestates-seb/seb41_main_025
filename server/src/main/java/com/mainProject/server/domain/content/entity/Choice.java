package com.mainProject.server.domain.content.entity;

import com.mainProject.server.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Choice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceId;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;
}
