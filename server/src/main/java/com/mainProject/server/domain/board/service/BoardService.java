package com.mainProject.server.domain.board.service;

import com.mainProject.server.domain.board.eneity.TvingBoard;
import com.mainProject.server.domain.board.eneity.WatchaBoard;
import com.mainProject.server.domain.board.eneity.WavveBoard;
import com.mainProject.server.domain.board.repository.TvingBoardRepository;
import com.mainProject.server.domain.board.repository.WatchaBoardRepository;
import com.mainProject.server.domain.board.repository.WavveBoardRepository;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.member.service.MemberService;
import com.mainProject.server.global.exception.BusinessLogicException;
import com.mainProject.server.global.exception.ExceptionCode;
import com.mainProject.server.global.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {
    private final WatchaBoardRepository watchaBoardRepository;
    private final TvingBoardRepository tvingBoardRepository;
    private final WavveBoardRepository wavveBoardRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<WatchaBoard> watchaBoardCustomBeanUtils;
    private final CustomBeanUtils<TvingBoard> tvingBoardCustomBeanUtils;
    private final CustomBeanUtils<WavveBoard> wavveBoardCustomBeanUtils;

    // TODO POST
    public WatchaBoard createWatchaBoard(WatchaBoard watchaBoard){
        log.info("# watchaboard ={}", watchaBoard.toString());
        log.info("##memberId = {}", memberService.getCurrentMember().getMemberId());
        log.info("##findMember = {}", memberService.findMember(memberService.getCurrentMember().getMemberId()));
        Member member = memberService.findMember(memberService.getCurrentMember().getMemberId());
        log.info("# member who = {}", member.toString());
        watchaBoard.setMember(member);
        return watchaBoardRepository.save(watchaBoard);
    }

    public TvingBoard createTvingBoard(TvingBoard tvingBoard){
        Member member = memberService.findMember(memberService.getCurrentMember().getMemberId());
        tvingBoard.setMember(member);
        return tvingBoardRepository.save(tvingBoard);
    }

    public WavveBoard createWavveBoard(WavveBoard wavveBoard){
        Member member = memberService.findMember(memberService.getCurrentMember().getMemberId());
        wavveBoard.setMember(member);
        return wavveBoardRepository.save(wavveBoard);
    }

    // TODO PATCH
    public WatchaBoard patchWatchaBoard(WatchaBoard watchaBoard){
        WatchaBoard findWatchaBoard = findVerifiedWatchaBoard(watchaBoard.getWatchaBoardId());
        Member member = memberService.findVerifiedMember(findWatchaBoard.getMember().getMemberId());

        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()) {
                throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        WatchaBoard updateboard = watchaBoardCustomBeanUtils.copyNonNullProperties(watchaBoard, findWatchaBoard);

        return watchaBoardRepository.save(updateboard);

    }

    public TvingBoard patchTvingBoard(TvingBoard tvingBoard) {
        TvingBoard findTvingBoard = findVerifiedTvingBoard(tvingBoard.getTvingBoardId());
        Member member = memberService.findVerifiedMember(findTvingBoard.getMember().getMemberId());
        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()) {
            throw  new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        TvingBoard updateBoard = tvingBoardCustomBeanUtils.copyNonNullProperties(tvingBoard, findTvingBoard);

        return tvingBoardRepository.save(updateBoard);
    }

    public WavveBoard patchWavveBoard(WavveBoard wavveBoard) {
        WavveBoard findWavveBoard = findVerifiedWavveBoard(wavveBoard.getWavveBoardId());
        Member member = memberService.findVerifiedMember(findWavveBoard.getMember().getMemberId());
        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        WavveBoard updateBoard = wavveBoardCustomBeanUtils.copyNonNullProperties(wavveBoard, findWavveBoard);
        return wavveBoardRepository.save(updateBoard);
    }


    // TODO FIND
    public WatchaBoard findWatchaBoard(long watchaId) {
        WatchaBoard watchaBoard = findVerifiedWatchaBoard(watchaId);

        return  watchaBoard;
    }

    public TvingBoard findTvingBoard(long tvingId) {
        TvingBoard watchaBoard = findVerifiedTvingBoard(tvingId);

        return  watchaBoard;
    }
    public WavveBoard findWavveBoard(long wavveId) {
        WavveBoard wavveBoard = findVerifiedWavveBoard(wavveId);

        return  wavveBoard;
    }


    // TODO FIND ALL
    public Page<WatchaBoard> findWatchaBoards(int page, int size){
        return watchaBoardRepository.findAll(PageRequest.of(page, size, Sort.by("watchaBoardId").ascending()));
    }

    public Page<TvingBoard> findTvingBoards(int page, int size){
        return tvingBoardRepository.findAll(PageRequest.of(page, size, Sort.by("tvingBoardId").ascending()));
    }

    public Page<WavveBoard> findWavveBoards(int page, int size){
        return wavveBoardRepository.findAll(PageRequest.of(page, size, Sort.by("wavveBoardId").ascending()));
    }


    // TODO DELETE
    public void deleteWatchaBoard(long watchaBoardId) {
        WatchaBoard findWatchBoard = findVerifiedWatchaBoard(watchaBoardId);
        Member member = memberService.findVerifiedMember(findWatchBoard.getMember().getMemberId());

        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()) {
            throw  new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        watchaBoardRepository.delete(findWatchBoard);
    }

    public void deleteTvingBoard(long tvingBoardId){
        TvingBoard findTvingBoard = findVerifiedTvingBoard(tvingBoardId);
        Member member = memberService.findVerifiedMember(findTvingBoard.getMember().getMemberId());

        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        tvingBoardRepository.delete(findTvingBoard);
    }

    public void deleteWavveBoard(long wavveBoardId) {
        WavveBoard findWavveBoard = findVerifiedWavveBoard(wavveBoardId);
        Member member = memberService.findVerifiedMember(findWavveBoard.getMember().getMemberId());

        if(memberService.getCurrentMember().getMemberId() != member.getMemberId()) {
            throw  new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        wavveBoardRepository.delete(findWavveBoard);
    }


    // TODO FIND VERIFIED
    public WatchaBoard findVerifiedWatchaBoard(long watchaBoardId) {
        Optional<WatchaBoard> optionalWatchaBoard = watchaBoardRepository.findById(watchaBoardId);
        WatchaBoard findBoard = optionalWatchaBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    public TvingBoard findVerifiedTvingBoard(long tvingBoardId) {
        Optional<TvingBoard> optionalTvingBoardBoard = tvingBoardRepository.findById(tvingBoardId);
        TvingBoard findBoard = optionalTvingBoardBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    public WavveBoard findVerifiedWavveBoard(long wavveBoadId) {
        Optional<WavveBoard> optionalWavveBoard = wavveBoardRepository.findById(wavveBoadId);
        WavveBoard findBoard = optionalWavveBoard.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }
}
