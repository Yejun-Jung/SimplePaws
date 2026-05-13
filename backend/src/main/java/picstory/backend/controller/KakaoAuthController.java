package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.KakaoAuthService;
import picstory.backend.web.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth/kakao")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    @GetMapping("/callback")
    public ResponseEntity<LoginResponse> kakaoCallback(@RequestParam String code) {
        // 별도의 LoginService 호출 없이, 카카오 서비스 내에서 모든 가입/로그인 처리를 완료합니다.
        LoginResponse response = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok(response);
    }
}