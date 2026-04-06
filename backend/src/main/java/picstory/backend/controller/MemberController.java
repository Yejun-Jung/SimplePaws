package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.MemberService;
import picstory.backend.web.dto.SignupRequest;

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
}