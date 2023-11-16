package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.MemberDTO;
import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final MailService mailService;

    public void save(MemberDTO memberDTO) {
        // 1. dto -> entity 변환
        // 2. repository의 save 메서드 호출
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
        // repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public MemberDTO login(MemberDTO memberDTO) {
        /*
            1. 회원이 입력한 이메일로 DB에서 조회를 함
            2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
         */
        Optional<MemberEntity> byMemberId = memberRepository.findByMemberId(memberDTO.getMemberId());
        if (byMemberId.isPresent()) {
            // 조회 결과가 있다(해당 아이디를 가진 회원 정보가 있다)
            MemberEntity memberEntity = byMemberId.get();
            if (memberEntity.getMemberPassword().equals(memberDTO.getMemberPassword())) {
                // 비밀번호 일치
                // entity -> dto 변환 후 리턴
                MemberDTO dto = MemberDTO.toMemberDTO(memberEntity);
                return dto;
            } else {
                // 비밀번호 불일치(로그인실패)
                return null;
            }
        } else {
            // 조회 결과가 없다(해당 아이디를 가진 회원이 없다)
            return null;
        }
    }

    public List<MemberDTO> findAll() {
        List<MemberEntity> memberEntityList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (MemberEntity memberEntity: memberEntityList) {
            memberDTOList.add(MemberDTO.toMemberDTO(memberEntity));
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity);
//            memberDTOList.add(memberDTO);
        }
        return memberDTOList;
    }

    public MemberDTO findById(Long seq) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(seq);
        if (optionalMemberEntity.isPresent()) {
//            MemberEntity memberEntity = optionalMemberEntity.get();
//            MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity);
//            return memberDTO;
            return MemberDTO.toMemberDTO(optionalMemberEntity.get());
        } else {
            return null;
        }
    }

    public MemberDTO updateForm(String myId) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberId(myId);
        if (optionalMemberEntity.isPresent()) {
            return MemberDTO.toMemberDTO(optionalMemberEntity.get());
        } else {
            return null;
        }
    }

    public void update(MemberDTO memberDTO) {
        memberRepository.save(MemberEntity.toUpdateMemberEntity(memberDTO));
    }

    public void deleteById(Long seq) {
        memberRepository.deleteById(seq);
    }

    public String idCheck(String memberId) {
        Optional<MemberEntity> byMemberId = memberRepository.findByMemberId(memberId);
        if (byMemberId.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }

    public boolean sendId(String memberName, String memberEmail) {
        // 이름과 이메일로 회원 정보 조회
        Optional<MemberEntity> memberOpt = memberRepository.findByMemberName(memberName);
        if (memberOpt.isPresent()) {
            MemberEntity member = memberOpt.get();
            if (member.getMemberEmail().equals(memberEmail)) {
                // 해당 계정의 Id 조회
                String memberId = member.getMemberId();
                // Id를 이메일로 전송
                sendIdEmail(memberEmail, memberId);
                return true;
            }
        }
        return false;
    }

    public void sendIdEmail(String email, String Id) {
        mailService.sendIdEmail(email, Id);
    }

    public boolean sendTemporaryPassword(String memberId, String memberEmail) {
        // 아이디와 이메일로 회원 정보 조회
        Optional<MemberEntity> memberOpt = memberRepository.findByMemberId(memberId);
        if (memberOpt.isPresent()) {
            MemberEntity member = memberOpt.get();
            if (member.getMemberEmail().equals(memberEmail)) {
                // 임시 비밀번호 생성
                String temporaryPassword = generateTemporaryPassword();
                // 회원의 비밀번호를 임시 비밀번호로 업데이트
                member.setMemberPassword(temporaryPassword);
                memberRepository.save(member);
                // 임시 비밀번호를 이메일로 전송
                sendTemporaryPasswordEmail(memberEmail, temporaryPassword);
                return true;
            }
        }
        return false;
    }

    public void sendTemporaryPasswordEmail(String email, String temporaryPassword) {
        mailService.sendTemporaryPasswordEmail(email, temporaryPassword);
    }

    private String generateTemporaryPassword() {
        // 무작위 32자 토큰 생성
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[24];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }
}