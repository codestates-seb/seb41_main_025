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
public class WatchaBoard extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    @Column(nullable = false)
    private String boardTitle;

    @Column(nullable = false)
    private String boardBody;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

}
