package com.mainProject.server.domain.comment.mapper;

import com.mainProject.server.domain.comment.dto.CommentDto;
import com.mainProject.server.domain.comment.entity.Comment;
import com.mainProject.server.domain.content.entity.Content;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    default Comment commentPostToComment(CommentDto.Post postRequest){
        Comment comment = new Comment();
        Content content = new Content();
        content.setContentId(postRequest.getContentId());
        comment.setContent(content);
        comment.setCommentBody(postRequest.getCommentBody());
        return comment;
    }
    Comment commentPatchToComment(CommentDto.Patch patchRequest);
    default CommentDto.Response commentToCommentResponseDto(Comment comment){
        CommentDto.Response response = new CommentDto.Response(
            comment.getCommentId(),
            comment.getCommentBody(),
            comment.getCreatedAt(),
            comment.getModifiedAt(),
            comment.getMember().getMemberId(),
            comment.getContent().getContentId()
        );
        return response;
    }
    default List<CommentDto.Response> commentListToCommentResponseDto(List<Comment> commentList){

        return commentList.stream()
                .map(comment -> {
                    return commentToCommentResponseDto(comment);

                }).collect(Collectors.toList());
    }
}
