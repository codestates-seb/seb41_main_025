package com.mainProject.server.domain.content.entity;

import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Content extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @Column(nullable = false)
    private String contentTitle;

    @Column(nullable = false, length = 100000)
    private String contentBody;

    @Column(nullable = false)
    private String contentPoster;

    @Column(nullable = false)
    private String contentRank;

    @Column(nullable = false)
    private String contentOpenAt;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Ott> ottList = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Choice> choiceList = new ArrayList<>(); // 찜

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Deprecated> deprecatedList = new ArrayList<>(); // 비추 = 추하면 비추 못함

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Recommend> recommendList = new ArrayList<>(); // 추 = 비추하면 추 못함

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>(); // 인생작 3편 이하 선택
}
