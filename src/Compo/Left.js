import React, { useState, useEffect } from 'react';
import '../NavigationBar.css';
import logo from '../Img/Logo-white.png';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Find from '../01/Find.js';
import CardDetail from '../01/CardDetail.js'; 
import Health from '../02/Health.js'; 
import Community from '../03/Community.js'; 
import Qna from '../04/Qna.js';
import MainApp from '../App.js'
import LoginForm from './LoginForm.js'; // 로그인 폼 컴포넌트
import Signup from './SignUp.js'; // 회원가입 폼 컴포넌트
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/find/card/:cardId" element={<CardDetail />} />
        <Route path="/health" element={<Health />} />
        <Route path="/community" element={<Community />} />
        <Route path="/qna" element={<Qna />} />
      </Routes>
    </BrowserRouter>
  );
}

function NavigationBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/checkSession', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem('user', JSON.stringify(data));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('세션 확인 실패:', error);
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setLoginMessage(`${username}님, 반갑습니다!`);
        setShowLoginModal(false);
      } else {
        const errorMessage = '로그인에 실패했습니다.';
        if (window.confirm(`${errorMessage}. 회원가입 하시겠습니까?`)) {
          setShowSignup(true);
        }
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const handleSignup = () => setShowSignup(true);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginMessage('');
  };

  return (
    <div style={{ width: '12%', height: '100vh', position: 'fixed', padding: 0 }}>
        <ul className="nav-list">
            <div className="logo">
                <img
                  src={logo}
                  alt="carefinder-logo"
                  onClick={() => navigate('/')} // 메인 화면으로 돌아가기
                  style={{
                    cursor: 'pointer',
                    border: '2px solid #ccc',  // 보더를 2px 회색으로 적용
                    borderRadius: '8px',       // 모서리를 둥글게 처리
                    padding: '4px',            // 이미지와 보더 사이에 패딩 적용
                }}
            />
            </div>
            <li onClick={() => navigate('/find')}>
              내 맘에 쏙 병원찾기
            </li>
            <li onClick={() => navigate('/health')}>
              건강백과사전
            </li>
            <li onClick={() => navigate('/community')}>
              너도 아파? 나도 아파!
            </li>
            <li onClick={() => navigate('/qna')}>
              Q & A
            </li>
        {/* 로그인 및 회원가입 버튼 추가 */}
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
                <button
                  className="sign-button"
                  style={{ backgroundColor: 'rgb(18, 135, 202)', color: 'white', fontSize:"0.8rem" }}
                  onClick={() => setShowLoginModal(true)}
                >
                  로그인
                </button>
                <button
                  className="sign-button"
                  style={{ backgroundColor: 'rgb(18, 135, 202)', color: 'white', fontSize:"0.8rem" }}
                  onClick={handleSignup}
                >
                  회원가입
                </button>
            </>
          ) : (
            <>
              <li className="welcome-message">{loginMessage}</li>
              <li>
                <button
                  className="sign-button"
                  style={{ backgroundColor: '#f44336', color: 'white' }}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </>
          )}
        </div>
      </ul>

      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
}


export default NavigationBar;