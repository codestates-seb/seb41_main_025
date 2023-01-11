package com.mainProject.server.domain.choice.entity;


import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Choice extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long choiceId;

    @Column
    private Boolean choiceSelected;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;
}
