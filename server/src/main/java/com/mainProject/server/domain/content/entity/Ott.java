package com.mainProject.server.domain.content.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ott {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ottId;
    private String ottName;
    private String rank;

    @ManyToOne
    @JoinColumn(name="CONTENT_ID")
    private Content content;
}
