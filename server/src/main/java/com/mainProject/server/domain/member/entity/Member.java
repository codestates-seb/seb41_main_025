package com.mainProject.server.domain.member.entity;

import com.mainProject.server.domain.board.eneity.Board;
import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.content.entity.Choice;
import com.mainProject.server.domain.content.entity.Deprecated;
import com.mainProject.server.domain.content.entity.Favorite;
import com.mainProject.server.domain.content.entity.Recommend;
import com.mainProject.server.global.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
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
    // 추가
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL)
    private List<Board> boardList;

    @OneToMany(mappedBy="member", cascade = CascadeType.ALL)
    private List<Comment> commentList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Choice> choiceList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Deprecated> deprecatedList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Recommend> recommendList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList;

}
