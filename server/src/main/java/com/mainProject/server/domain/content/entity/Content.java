package com.mainProject.server.domain.content.entity;

import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Content extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contentId;

    @Column(nullable = false)
    private String contentTitle;

    @Column(length = 100, nullable = false)
    private String contentBody;

    @Column(nullable = false)
    private String contentPoster;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Comment> commentList;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Choice> choiceList;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Deprecated> deprecatedList;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Recomend> recomendList;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList;
}
