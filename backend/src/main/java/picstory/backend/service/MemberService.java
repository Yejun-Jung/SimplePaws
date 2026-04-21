package picstory.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // 추가
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import picstory.backend.domain.Member;
import picstory.backend.repository.MemberRepository;
import picstory.backend.repository.PostRepository;
import picstory.backend.web.dto.SignupRequest;
import picstory.backend.web.dto.UpdateMemberRequest;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder; // 주입 추가

    @Transactional
    public void signup(SignupRequest request) {
        Member member = Member.builder()
                .email(request.getEmail())
                // 🔥 비밀번호를 암호화해서 저장해야 합니다.
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public Member getMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional
    public void updateMember(String email, UpdateMemberRequest request) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 🔥 수정 시에도 비밀번호가 넘어왔다면 암호화해서 업데이트해야 합니다.
        String encodedPassword = member.getPassword();
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            encodedPassword = passwordEncoder.encode(request.getPassword());
        }

        member.update(request.getName(), request.getEmail(), encodedPassword, request.getBio(), request.getProfileImageUrl());
    }

    @Transactional
    public void delete(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        postRepository.deleteByMember(member);
        memberRepository.delete(member);
    }
}