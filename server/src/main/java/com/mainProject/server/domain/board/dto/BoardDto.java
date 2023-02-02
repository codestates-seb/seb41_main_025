package com.mainProject.server.domain.board.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BoardDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class WatchaPost{
        @NotBlank(message = "빈 게시물은 등록할 수 없습니다.")
        private String watchaBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class TvingPost{
        @NotBlank(message = "빈 게시물은 등록할 수 없습니다.")

        private String tvingBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class WavvePost{
        @NotBlank(message = "빈 게시물은 등록할 수 없습니다.")

        private String wavveBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class WatchaPatch{
        @NotBlank(message = "빈 게시물로 수정할 수 없니다.")
        private String watchaBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class TvingPatch{
        @NotBlank(message = "빈 게시물로 수정할 수 없니다.")
        private String tvingBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class WavvePatch{
        @NotBlank(message = "빈 게시물로 수정할 수 없니다.")
        private String wavveBoardBody;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class WatchaResponse{
        private Long watchaBoardId;
        private Long memberId;
        private String nickName;
        private String memberPicture;
        private String watchaBoardBody;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class TvingResponse{
        private Long tvingBoardId;
        private Long memberId;
        private String nickName;
        private String memberPicture;
        private String tvingBoardBody;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class WavveResponse{
        private Long wavveBoardId;
        private Long memberId;
        private String nickName;
        private String memberPicture;
        private String wavveBoardBody;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }
}
