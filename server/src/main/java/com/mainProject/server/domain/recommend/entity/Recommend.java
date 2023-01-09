package com.mainProject.server.domain.recommend.entity;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recommend extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendId;

    @Column
    private Boolean recommendSelected;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;


}
