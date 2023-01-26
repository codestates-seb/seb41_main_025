package com.mainProject.server.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class DoubleResponseDto<T> {
    private T data;
    private List<String> ottList;
}
