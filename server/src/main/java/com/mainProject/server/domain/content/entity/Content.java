package com.mainProject.server.domain.content.entity;

import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import com.mainProject.server.global.audit.Auditable;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Content extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @Column(nullable = false)
    private String contentTitle; //7

    @Column(nullable = false, length = 100000)
    private String contentBody; //8

    @Column(nullable = false)
    private String contentPoster;

    @Column(nullable = false)
    private String contentOttName;

    @Column(nullable = false)
    private String contentOttRank;

    @Column
    private String contentOpenAt; // 개봉 0

    @Column
    private String contentGenre; // 장르 1

    @Column
    private String contentCountry; // 국가 2

    @Column
    private String contentScore; // 평점 3

    @Column
    private String contentRunningTime; // 러닝타임 4

    @Column
    private String contentGrade; // 등급 5

    @Column
    private String contentAttendance; // 누적관객 6

    @Column
    private String contentOttList;

    @Column
    private Long choiceCount;

    @Column
    private Long recommendCount;

    @Column
    private Long deprecateCount;

    @Column
    private Long favoriteCount;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Ott> ottList = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Choice> choiceList = new ArrayList<>(); // 찜

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Deprecate> deprecatedList = new ArrayList<>(); // 비추 = 추하면 비추 못함

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Recommend> recommendList = new ArrayList<>(); // 추 = 비추하면 추 못함

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>(); // 인생작 3편 이하 선택
}
