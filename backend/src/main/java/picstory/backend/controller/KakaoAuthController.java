package picstory.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.KakaoAuthService;
import picstory.backend.web.dto.LoginResponse;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/auth/kakao")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @GetMapping
    public void redirectToKakao(HttpServletResponse response) throws IOException {
        response.sendRedirect(kakaoAuthService.getAuthorizationUrl());
    }

    @GetMapping("/callback")
    public void callback(@RequestParam String code, HttpServletResponse response) throws IOException {
        LoginResponse loginResponse = kakaoAuthService.kakaoLogin(code);
        String redirectUrl = frontendUrl + "/oauth/callback/kakao"
                + "?token=" + loginResponse.getAccessToken()
                + "&nickname=" + URLEncoder.encode(loginResponse.getNickname(), StandardCharsets.UTF_8)
                + "&email=" + URLEncoder.encode(loginResponse.getEmail(), StandardCharsets.UTF_8);
        response.sendRedirect(redirectUrl);
    }
}
