package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.MemberDTO;
import com.codingrecipe.member.service.MailService;
import com.codingrecipe.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;
    private final MailService mailService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/member/save")
    public String save(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);
        memberService.save(memberDTO);
        return "index";
    }

    @GetMapping("/member/index")
    public String loginForm() {
        return "index";
    }

    @PostMapping("/member/index")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공
            session.setAttribute("loginId", loginResult.getMemberId());
            return "main";
        } else {
            // login 실패
            return "index";
        }
    }

    @GetMapping("/member/")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        // 어떠한 html로 가져갈 데이터가 있다면 model사용
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }

    @GetMapping("/member/{seq}")
    public String findById(@PathVariable Long seq, Model model) {
        MemberDTO memberDTO = memberService.findById(seq);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    @GetMapping("/member/update")
    public String updateForm(HttpSession session, Model model) {
        String myId = (String) session.getAttribute("loginId");
        MemberDTO memberDTO = memberService.updateForm(myId);
        model.addAttribute("updateMember", memberDTO);
        return "update";
    }

    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO) {
        memberService.update(memberDTO);
        return "redirect:/member/" + memberDTO.getMemberSeq();
    }

    @GetMapping("/member/delete/{seq}")
    public String deleteById(@PathVariable Long seq) {
        memberService.deleteById(seq);
        return "redirect:/member/";
    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/member/id-check")
    public @ResponseBody String idCheck(@RequestParam("memberId") String memberId) {
        System.out.println("memberId = " + memberId);
        String checkResult = memberService.idCheck(memberId);
        return checkResult;
    }

    @ResponseBody
    @PostMapping("/mail")
    public String MailSend(String mail){
        int number = mailService.sendMail(mail);
        String num = "" + number;

        return num;
    }

    @GetMapping("/member/forgot-password")
    public String forgotPasswordForm() {
        return "forgot-password";
    }

    @PostMapping("/member/send-temporary-password")
    public String sendTemporaryPassword(
            @RequestParam("memberId") String memberId,
            @RequestParam("memberEmail") String memberEmail
    ) {
        if (memberService.sendTemporaryPassword(memberId, memberEmail)) {
            // 임시 비밀번호 전송 성공
            return "temporary-password-success"; // 임시 비밀번호 전송 성공 페이지
        } else {
            // 회원 정보가 일치하지 않음
            return "temporary-password-error"; // 에러 페이지
        }
    }
}