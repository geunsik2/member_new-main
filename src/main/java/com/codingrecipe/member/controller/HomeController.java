package com.codingrecipe.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.File;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/displayImage")
    public String displayImage(Model model) {
        // HTML 템플릿에 전달할 다른 데이터를 추가할 수 있습니다.
        // 예를 들어: model.addAttribute("pageTitle", "이미지 페이지");
        return "save";
    }
}
