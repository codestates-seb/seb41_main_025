package com.mainProject.server.domain.board.controller;


import com.mainProject.server.domain.board.dto.BoardDto;
import com.mainProject.server.domain.board.eneity.TvingBoard;
import com.mainProject.server.domain.board.eneity.WatchaBoard;
import com.mainProject.server.domain.board.eneity.WavveBoard;
import com.mainProject.server.domain.board.mapper.BoardMapper;
import com.mainProject.server.domain.board.service.BoardService;
import com.mainProject.server.global.response.MultiResponseDto;
import com.mainProject.server.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;

    // TODO POST
    @PostMapping("/watcha")
    public ResponseEntity postWatchBoard(@Valid @RequestBody BoardDto.WatchaPost postRequest) {
        WatchaBoard watchaBoardForService = mapper.watchaBoardPostDtoToWatchaBoard(postRequest);
        WatchaBoard watchaBoardForResponse = boardService.createWatchaBoard(watchaBoardForService);
        BoardDto.WatchaResponse response = mapper.watchaBoardToWatchaBoardResponseDto(watchaBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }


    @PostMapping("/tving")
    public ResponseEntity postTvingBoard(@Valid @RequestBody BoardDto.TvingPost postRequest) {
        TvingBoard tvingBoardForService = mapper.tvingBoardPostDtoToTvingBoard(postRequest);
        TvingBoard tvingBoardForResponse = boardService.createTvingBoard(tvingBoardForService);
        BoardDto.TvingResponse response = mapper.tvingBoardToTvingBoardResponseDto(tvingBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/wavve")
    public ResponseEntity postWavveBoard(@Valid @RequestBody BoardDto.WavvePost postRequest) {
        WavveBoard wavveBoardForService = mapper.wavveBoardPostDtoToWavveBoard(postRequest);
        WavveBoard wavveBoardForResponse = boardService.createWavveBoard(wavveBoardForService);
        BoardDto.WavveResponse response = mapper.wavveBoardToWavveBoardResponseDto(wavveBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    // TODO PATCH
    @PatchMapping("/watcha/{watchaBoard-id}")
    public ResponseEntity patchWatchaBoard(@Valid @PathVariable("watchaBoard-id") long watchaBoardId,
                                          @RequestBody BoardDto.WatchaPatch watchaPatchRequest){
        WatchaBoard watchaBoard = mapper.watchaBoardPatchDtoToWatchaBoard(watchaPatchRequest);
        watchaBoard.setWatchaBoardId(watchaBoardId);
        WatchaBoard watchaBoardForResponse = boardService.patchWatchaBoard(watchaBoard);
        BoardDto.WatchaResponse response = mapper.watchaBoardToWatchaBoardResponseDto(watchaBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }


    @PatchMapping("/tving/{tvingBoard-id}")
    public ResponseEntity patchTvingBoard(@Valid @PathVariable("tvingBoard-id") long tvingBoardId,
                                          @RequestBody BoardDto.TvingPatch tvingPatchRequest){
        TvingBoard tvingBoard = mapper.tvingBoardPatchDtoToTvingBoard(tvingPatchRequest);
        tvingBoard.setTvingBoardId(tvingBoardId);
        TvingBoard tvingBoardForResponse = boardService.patchTvingBoard(tvingBoard);
        BoardDto.TvingResponse response = mapper.tvingBoardToTvingBoardResponseDto(tvingBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }


    @PatchMapping("/wavve/{wavveBoard-id}")
    public ResponseEntity patchWavveBoard(@Valid @PathVariable("wavveBoard-id") long wavveBoardId,
                                          @RequestBody BoardDto.WavvePatch wavvePatchRequest){
        WavveBoard wavveBoard = mapper.wavveBoardPatchDtoToWavveBoard(wavvePatchRequest);
        wavveBoard.setWavveBoardId(wavveBoardId);
        WavveBoard wavveBoardForResponse = boardService.patchWavveBoard(wavveBoard);
        BoardDto.WavveResponse response = mapper.wavveBoardToWavveBoardResponseDto(wavveBoardForResponse);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // TODO GET ALL
    @GetMapping("/watcha")
    public ResponseEntity getWatchaBoards(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<WatchaBoard> watchaBoardPage = boardService.findWatchaBoards(page -1, size);
        List<WatchaBoard> watchaBoards = watchaBoardPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                mapper.watchaBoardsToWatchaboardResponsedDtos(watchaBoards), watchaBoardPage), HttpStatus.OK);
    }

    @GetMapping("/tving")
    public ResponseEntity getTvingBoards(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size) {
        Page<TvingBoard> tvingBoardPage = boardService.findTvingBoards(page -1, size);
        List<TvingBoard> tvingBoards = tvingBoardPage.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.tvingBoardsToTvingboardResponsedDtos(tvingBoards), tvingBoardPage), HttpStatus.OK);
    }

    @GetMapping("/wavve")
    public ResponseEntity getWavveBoards(@Positive @RequestParam int page,
                                          @Positive @RequestParam int size){
        Page<WavveBoard> wavveBoardPage = boardService.findWavveBoards(page -1, size);
        List<WavveBoard> wavveBoards = wavveBoardPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                mapper.wavveBoardsToWavveboardResponsedDtos(wavveBoards), wavveBoardPage), HttpStatus.OK);
    }

    // TODO DELETE ONE
    @DeleteMapping("/watcha/{watcha-id}")
    public ResponseEntity deleteOneWhatchaBoard(@PathVariable("watcha-id") long watchaId){
        boardService.deleteWatchaBoard(watchaId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/tving/{tving-id}")
    public ResponseEntity deleteOneTvingBoard(@PathVariable("tving-id") long tvingId){
        boardService.deleteTvingBoard(tvingId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/wavve/{wavve-id}")
    public ResponseEntity deleteOneWavveBoard(@PathVariable("wavve-id") long wavveId){
        boardService.deleteWavveBoard(wavveId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}
