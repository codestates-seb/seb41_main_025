package com.mainProject.server.domain.member.entity;

import com.mainProject.server.domain.board.eneity.Board;
import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.favorite.eneity.Favorite;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.global.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Email @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String nickName;

    @Column
    private String memberPicture;

    @Column
    private long favoriteLimitTotal;
    // 추가
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL)
    private List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Choice> choiceList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Deprecate> deprecatedList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Recommend> recommendList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();

}
