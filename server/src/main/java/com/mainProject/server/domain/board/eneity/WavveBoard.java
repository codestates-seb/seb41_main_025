package com.mainProject.server.domain.board.eneity;

import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WavveBoard extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wavveBoardId;

    @Column(nullable = false)
    private String wavveBoardBody;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

}
