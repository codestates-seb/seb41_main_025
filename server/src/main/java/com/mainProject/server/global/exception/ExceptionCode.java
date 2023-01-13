package com.mainProject.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_NOT_ALLOW(405, "That Member doesn't have authority"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_REDIRECTION_LOGIN_SUCCESS(303,"Member redirection login success"),
    MEMBER_REDIRECTION_FIND_PASSWORD(303,"Member redirection find password"),
    MEMBER_NAME_EXISTS(409, "Member name exist"),
    MEMBER_UNAUTHORIZED(401, "Member unauthorized"),
    CONTENT_NOT_FOUND(404, "Content not found"),
    CONTENT_EXISTS(409, "Content exists"),
    QUESTION_IS_NOT(405, "That answer isn't answer the question."),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_EXISTS(409, "Comment exists"),
    FAVORITE_FULL_ALREADY(409, "Favorite is full already."),
    VOTE_NOT_ALLOW(405, "You're already voted "),
    TAG_NOT_FOUND(404, "Tag not found"),
    TAG_EXISTS(409, "Tag exists"),
    EMAIL_NOT_FOUND(404, "Email not found"),
    EMAIL_EXISTS(404, "Email exists"),
    RECOMMEND_NOT_FOUND(404, "Member not found"),
    DEPRECATE_NOT_FOUND(404, "Member not found"),
    FAVORITE_NOT_FOUND(404, "Member not found"),
    CHOICE_NOT_FOUND(404, "Member not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
