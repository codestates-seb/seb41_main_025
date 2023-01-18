package com.mainProject.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_NOT_ALLOW(405, "That Member doesn't have authority"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_UNAUTHORIZED(401, "Member unauthorized"),
    CONTENT_NOT_FOUND(404, "Content not found"),
    CONTENT_EXISTS(409, "Content exists"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_EXISTS(409, "Comment exists"),
    FAVORITE_FULL_ALREADY(409, "Favorite is full already."),
    RECOMMEND_NOT_FOUND(404, "Recommend not found"),
    DEPRECATE_NOT_FOUND(404, "Deprecate not found"),
    FAVORITE_NOT_FOUND(404, "Favorite not found"),
    CHOICE_NOT_FOUND(404, "Member not found"),
    TOKEN_NOT_ALLOW(404, "Token not allow"),
    REFRESHTOKEN_NOT_FOUND(404, "Refresh token not found"),
    REFRESHTOKEN_NOT_EQUAL(404, "Refresh token doesn't equal"),
    REFRESHTOKEN_NOT_ALLOW(404, "Token not allow");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
