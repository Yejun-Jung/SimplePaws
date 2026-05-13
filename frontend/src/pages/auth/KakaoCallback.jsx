import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        // 1. 주소창에서 인가 코드(code) 추출
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            // 2. 백엔드로 인가 코드를 보내서 진짜 토큰 받아오기 (주소 8081 주의)
            axios.get(`http://localhost:8081/api/auth/kakao/callback?code=${code}`)
                .then((res) => {
                    // 3. 백엔드가 준 데이터 꺼내기 (백엔드 응답 형태에 따라 res.data 형태가 다를 수 있음)
                    const { accessToken, nickname, email } = res.data;
                    
                    // 4. 브라우저 로컬 스토리지에 토큰 저장
                    localStorage.setItem('token', accessToken); // 기존 Login.jsx에 맞춤
                    if (email) localStorage.setItem('email', email);
                    
                    alert(`${nickname}님 환영합니다!`);
                    
                    // 5. 로그인 성공 시 메인 화면으로 이동
                    navigate('/main'); 
                })
                .catch((err) => {
                    console.error('카카오 로그인 에러:', err);
                    alert('카카오 로그인에 실패했습니다.');
                    navigate('/login');
                });
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>카카오 로그인 처리 중입니다... 🐾</h2>
        </div>
    );
};

export default KakaoCallback;