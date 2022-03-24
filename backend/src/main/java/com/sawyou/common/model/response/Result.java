package com.sawyou.common.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Result<T> {
    private T data;
    private int status;
    private String message;
}
