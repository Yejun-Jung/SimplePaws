package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.MemberService;
import picstory.backend.domain.Member;
import picstory.backend.web.dto.SignupRequest;
import picstory.backend.web.dto.UpdateMemberRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> signup(@RequestBody SignupRequest request) {
        memberService.signup(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getMember(@RequestParam(name = "email") String email) {
        Member member = memberService.getMember(email);
        Map<String, Object> response = new HashMap<>();
        response.put("name", member.getName());
        response.put("email", member.getEmail());
        response.put("bio", member.getBio());
        response.put("profileImageUrl", member.getProfileImageUrl());
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<Void> updateMember(@RequestParam(name = "email") String email, @RequestBody UpdateMemberRequest request) {
        memberService.updateMember(email, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(name = "email") String email) {
        memberService.delete(email);
        return ResponseEntity.ok().build();
    }
}