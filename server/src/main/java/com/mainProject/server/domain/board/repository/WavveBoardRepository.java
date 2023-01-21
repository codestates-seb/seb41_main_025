package com.mainProject.server.domain.board.repository;

import com.mainProject.server.domain.board.eneity.WatchaBoard;
import com.mainProject.server.domain.board.eneity.WavveBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WavveBoardRepository extends JpaRepository<WavveBoard, Long> {

}
