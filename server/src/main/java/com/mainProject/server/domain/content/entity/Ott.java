package com.mainProject.server.domain.content.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Data
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
