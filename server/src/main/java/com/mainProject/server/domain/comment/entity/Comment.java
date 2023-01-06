package com.mainProject.server.domain.comment.entity;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Comment extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String commentBody;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;


    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;
}
