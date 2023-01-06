package com.mainProject.server.domain.comment.mapper;

import com.mainProject.server.domain.comment.dto.CommentDto;
import com.mainProject.server.domain.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostToComment(CommentDto.Post postRequest);
    Comment commentPatchToComment(CommentDto.Patch patchRequest);
    CommentDto.Response commentToCommentResponseDto(Comment comment);
    List<CommentDto.Response> commentListToCommentResponseDto(List<Comment> commentList);
}
