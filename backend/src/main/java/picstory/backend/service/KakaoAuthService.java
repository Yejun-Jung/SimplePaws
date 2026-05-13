package picstory.backend.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import lombok.RequiredArgsConstructor;
import picstory.backend.config.KakaoProperties;
import picstory.backend.domain.Member;
import picstory.backend.domain.MemberStatus;
import picstory.backend.repository.MemberRepository;
import picstory.backend.security.JwtTokenProvider;
import picstory.backend.web.dto.KakaoTokenResponse;
import picstory.backend.web.dto.KakaoUserResponse;
import picstory.backend.web.dto.LoginResponse;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoProperties kakaoProperties;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RestTemplate restTemplate = new RestTemplate();

    public String getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoProperties.getClientId());
        params.add("redirect_uri", kakaoProperties.getRedirectUri());
        params.add("code", code);

        if (kakaoProperties.getClientSecret() != null && !kakaoProperties.getClientSecret().isEmpty()) {
            params.add("client_secret", kakaoProperties.getClientSecret());
        }

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<KakaoTokenResponse> response = restTemplate.exchange(
                kakaoProperties.getTokenUri(),
                HttpMethod.POST,
                request,
                KakaoTokenResponse.class
        );
        return response.getBody().getAccessToken();
    }

    public KakaoUserResponse getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
        ResponseEntity<KakaoUserResponse> response = restTemplate.exchange(
                kakaoProperties.getUserInfoUri(),
                HttpMethod.POST,
                request,
                KakaoUserResponse.class
        );
        return response.getBody();
    }

    public LoginResponse kakaoLogin(String code) {
        String accessToken = getAccessToken(code);
        KakaoUserResponse userInfo = getUserInfo(accessToken);

        // 카카오 고유 ID 추출
        String kakaoId = userInfo.getId().toString();

        // 닉네임 설정 (삼항 연산자로 final 제약 해결)
        String nickname = (userInfo.getKakaoAccount() != null && userInfo.getKakaoAccount().getProfile() != null)
                ? userInfo.getKakaoAccount().getProfile().getNickname()
                : "카카오사용자";

        // 이메일 권한이 없으므로 고유 ID를 이용한 식별자 생성
        String identifier = kakaoId + "@kakao.com";

        // 기존 회원이 없으면 자동 가입, 있으면 조회
        memberRepository.findByEmail(identifier).orElseGet(() ->
                memberRepository.save(Member.builder()
                        .email(identifier)
                        .name(nickname)
                        .password("")
                        .status(MemberStatus.ACTIVE)
                        .provider("kakao")
                        .build())
        );

        // JWT 토큰 생성 및 반환
        String jwtToken = jwtTokenProvider.createToken(identifier);
        return new LoginResponse(jwtToken, nickname, identifier);
    }
}