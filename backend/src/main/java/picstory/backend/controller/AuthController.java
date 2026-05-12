package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.LoginService;
import picstory.backend.service.KakaoAuthService;
import picstory.backend.web.dto.LoginRequest;
import picstory.backend.web.dto.LoginResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginService loginService;
    private final KakaoAuthService kakaoAuthService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String token = loginService.login(request);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/kakao/callback")
    public ResponseEntity<LoginResponse> kakaoCallback(@RequestParam String code) {
        LoginResponse loginResponse = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok(loginResponse);
    }
}