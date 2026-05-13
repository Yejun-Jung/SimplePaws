import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const nickname = params.get('nickname');
        const email = params.get('email');

        if (token) {
            localStorage.setItem('token', token);
            if (nickname) localStorage.setItem('nickname', nickname);
            if (email) localStorage.setItem('email', email);
            alert(`${nickname}님 환영합니다!`);
            navigate('/main', { replace: true });
        } else {
            alert('카카오 로그인에 실패했습니다.');
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>카카오 로그인 처리 중입니다... 🐾</h2>
        </div>
    );
};

export default KakaoCallback;
