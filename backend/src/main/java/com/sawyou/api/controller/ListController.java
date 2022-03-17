package com.sawyou.api.controller;

import com.sawyou.api.service.ListService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 게시글 리스트, 검색 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "게시글 리스트, 검색 API", tags = {"List"})
@RestController
@RequestMapping("/api/v1/list")
public class ListController {

    @Autowired
    private ListService listService;

}
