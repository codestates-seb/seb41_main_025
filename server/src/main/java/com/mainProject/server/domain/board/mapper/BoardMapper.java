package com.mainProject.server.domain.board.mapper;

import com.mainProject.server.domain.board.dto.BoardDto;
import com.mainProject.server.domain.board.eneity.TvingBoard;
import com.mainProject.server.domain.board.eneity.WatchaBoard;
import com.mainProject.server.domain.board.eneity.WavveBoard;
import com.mainProject.server.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {
    default WatchaBoard watchaBoardPostDtoToWatchaBoard(BoardDto.WatchaPost postRequest){
        Member member = new Member();
        WatchaBoard watchaBoard = WatchaBoard.builder()
                .watchaBoardBody(postRequest.getWatchaBoardBody())
                .member(member)
                .build();

        return watchaBoard;
    }

    default TvingBoard tvingBoardPostDtoToTvingBoard(BoardDto.TvingPost postRequest){
        Member member = new Member();
        TvingBoard tvingBoard = TvingBoard.builder()
                .tvingBoardBody(postRequest.getTvingBoardBody())
                .member(member)
                .build();
        return tvingBoard;
    }

    default WavveBoard wavveBoardPostDtoToWavveBoard(BoardDto.WavvePost postRequest) {
        Member member = new Member();
        WavveBoard wavveBoard = WavveBoard.builder()
                .wavveBoardBody(postRequest.getWavveBoardBody())
                .member(member)
                .build();
        return wavveBoard;
    }

    WatchaBoard watchaBoardPatchDtoToWatchaBoard(BoardDto.WatchaPatch postRequest);
    TvingBoard tvingBoardPatchDtoToTvingBoard(BoardDto.TvingPatch postRequest);
    WavveBoard wavveBoardPatchDtoToWavveBoard(BoardDto.WavvePatch postRequest);


    default BoardDto.TvingResponse tvingBoardToTvingBoardResponseDto(TvingBoard tvingBoard) {
        BoardDto.TvingResponse tvingResponse = BoardDto.TvingResponse.builder()
                .tvingBoardId(tvingBoard.getTvingBoardId())
                .memberId(tvingBoard.getMember().getMemberId())
                .nickName(tvingBoard.getMember().getNickName())
                .memberPicture(tvingBoard.getMember().getMemberPicture())
                .tvingBoardBody(tvingBoard.getTvingBoardBody())
                .createAt(tvingBoard.getCreatedAt())
                .modifiedAt(tvingBoard.getModifiedAt())
                .build();

        return tvingResponse;
    }
    default BoardDto.WatchaResponse watchaBoardToWatchaBoardResponseDto(WatchaBoard watchaBoard) {
        BoardDto.WatchaResponse watchaResponse = BoardDto.WatchaResponse.builder()
                .watchaBoardId(watchaBoard.getWatchaBoardId())
                .watchaBoardBody(watchaBoard.getWatchaBoardBody())
                .memberId(watchaBoard.getMember().getMemberId())
                .memberPicture(watchaBoard.getMember().getMemberPicture())
                .nickName(watchaBoard.getMember().getNickName())
                .modifiedAt(watchaBoard.getModifiedAt())
                .createAt(watchaBoard.getCreatedAt())
                .build();

        return watchaResponse;
    }
    default BoardDto.WavveResponse wavveBoardToWavveBoardResponseDto(WavveBoard wavveBoard) {
        BoardDto.WavveResponse wavveResponse = BoardDto.WavveResponse.builder()
                .wavveBoardId(wavveBoard.getWavveBoardId())
                .wavveBoardBody(wavveBoard.getWavveBoardBody())
                .memberId(wavveBoard.getMember().getMemberId())
                .nickName(wavveBoard.getMember().getNickName())
                .memberPicture(wavveBoard.getMember().getMemberPicture())
                .createAt(wavveBoard.getCreatedAt())
                .modifiedAt(wavveBoard.getModifiedAt())
                .build();

        return wavveResponse;
    }

    List<BoardDto.TvingResponse> tvingBoardsToTvingboardResponsedDtos(List<TvingBoard> tvingBoards);
    List<BoardDto.WatchaResponse> watchaBoardsToWatchaboardResponsedDtos(List<WatchaBoard> watchaBoards);
    List<BoardDto.WavveResponse> wavveBoardsToWavveboardResponsedDtos(List<WavveBoard> wavveBoards);

}
