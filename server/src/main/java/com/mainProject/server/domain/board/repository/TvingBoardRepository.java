package com.mainProject.server.domain.board.repository;

import com.mainProject.server.domain.board.eneity.TvingBoard;
import com.mainProject.server.domain.board.eneity.WatchaBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TvingBoardRepository extends JpaRepository<TvingBoard, Long> {

}
