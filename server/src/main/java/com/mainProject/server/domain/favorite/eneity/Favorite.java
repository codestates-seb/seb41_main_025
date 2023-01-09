package com.mainProject.server.domain.favorite.eneity;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite extends Auditable{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @Column
    private Boolean favoriteSelected;

    @Column
    private long favoriteLimit;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;

}
