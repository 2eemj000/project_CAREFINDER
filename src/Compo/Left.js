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
  const [loginMessage, setLoginMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/checkSession', {
          credentials: 'include', // 세션 쿠키를 포함
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUsername(data.username);
          setEmail(data.email);
          setLoginMessage(`${data.username}님, 반갑습니다!`);
        } else if (response.status === 401) {
          setIsLoggedIn(false);
          setLoginMessage('로그인 정보가 없습니다. 다시 로그인 해주세요.');
        } else {
          setIsLoggedIn(false);
          setLoginMessage('세션 확인 중 문제가 발생했습니다.');
        }
      } catch (error) {
        console.error('세션 확인 실패:', error);
        setIsLoggedIn(false);
        setLoginMessage('세션 확인 중 오류가 발생했습니다.');
      }
    };

    checkSession();
  }, []); // 빈 배열: 마운트 시에만 실행

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // 여기서 로그인 성공 후 추가 작업을 수행할 수 있습니다.
    // 예: 페이지 리디렉션, 사용자 데이터 로딩 등
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/signout', {
        method: 'POST',
        credentials: 'include', // 세션 쿠키를 포함
      });

      if (response.ok) {
        sessionStorage.removeItem('user'); // 세션 스토리지에서 사용자 정보 삭제
        setIsLoggedIn(false);
        setUsername('');
        setEmail('');
        setLoginMessage('로그아웃 되었습니다.');
      } else {
        console.error('로그아웃 실패');
        alert('로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
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
                style={{ backgroundColor: 'rgb(43, 116, 181)', color: 'white', fontSize: "0.8rem" }}
                onClick={() => setShowLoginModal(true)}
              >
                로그인
              </button>
              <button
                className="sign-button"
                style={{ backgroundColor: 'rgb(43, 116, 181)', color: 'white', fontSize: "0.8rem" }}
                onClick={() => setShowSignup(true)}
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              <p2 className="welcome-message" 
              style={{ backgroundColor: 'rgb(43, 116, 181)', color: 'white', fontSize: "0.8rem" }}>{loginMessage}</p2>
                <button
                  className="sign-button"
                  style={{ backgroundColor: 'rgb(43, 116, 181)', color: 'white', fontSize: "0.8rem" }}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
            </>
          )}
        </div>
      </ul>

      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} onLoginSuccess={username => { setIsLoggedIn(true); setUsername(username); setLoginMessage(`사랑하는 ${username}님`); setShowLoginModal(false); }} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default NavigationBar;