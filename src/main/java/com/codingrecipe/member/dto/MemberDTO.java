package com.codingrecipe.member.dto;

import com.codingrecipe.member.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberDTO {
    private Long memberSeq;         // 순번
    private String memberId;        // 아이디
    private String memberPassword;  // 비밀번호
    private String memberEmail;     // 이메일
    private String memberName;      // 이름
    private String memberBirth;     // 생년월일
    private String memberGender;    // 성별
    private String memberPhone;     // 전화번호

    public static MemberDTO toMemberDTO(MemberEntity memberEntity) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberSeq(memberEntity.getMemberSeq());
        memberDTO.setMemberId(memberEntity.getMemberId());
        memberDTO.setMemberPassword(memberEntity.getMemberPassword());
        memberDTO.setMemberEmail(memberEntity.getMemberEmail());
        memberDTO.setMemberName(memberEntity.getMemberName());
        memberDTO.setMemberBirth(memberEntity.getMemberBirth());
        memberDTO.setMemberGender(memberEntity.getMemberGender());
        memberDTO.setMemberPhone(memberEntity.getMemberPhone());
        return memberDTO;
    }
}
