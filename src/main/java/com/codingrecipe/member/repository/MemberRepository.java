package com.codingrecipe.member.repository;

import com.codingrecipe.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 아이디로 회원 정보 조회 (select * from member_table where member_id=?)
    Optional<MemberEntity> findByMemberId(String memberId);
    Optional<MemberEntity> findByMemberEmail(String memberEmail);

    // 비밀번호 재설정 토큰으로 회원 정보 조회
    Optional<MemberEntity> findByResetPasswordToken(String resetPasswordToken);
}