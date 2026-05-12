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
import picstory.backend.web.dto.KakaoTokenResponse;
import picstory.backend.web.dto.KakaoUserResponse;
import picstory.backend.web.dto.LoginResponse;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoProperties kakaoProperties;
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

        String nickname = userInfo.getKakaoAccount().getProfile().getNickname();
        String email = userInfo.getKakaoAccount().getEmail();

        String jwtToken = "JWT_TOKEN_생성_로직_필요";

        return new LoginResponse(jwtToken, nickname, email);
    }
}
