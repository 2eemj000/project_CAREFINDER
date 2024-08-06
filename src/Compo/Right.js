import React, { useState } from 'react';
import '../SignBar.css';
import { FcGoogle } from "react-icons/fc";
import { SiNaver, SiKakaotalk } from "react-icons/si";

function SignBar() {
  // 로그인 상태를 관리하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 및 로그아웃 핸들러
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={{ width: '20%', height: '100vh', backgroundColor: '#eeeeee', position: 'fixed', right: 0, padding: 0 }}>
      <ul className="sign-list">
        {!isLoggedIn ? (
          <>
            <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white' }}>회원가입</button></li>
            <li className="input-section">
              <input type="text" id="userId" className="input-field" placeholder="아이디 또는 전화번호 입력" />
              <input type="password" id="password" className="input-field" placeholder="비밀번호 입력" />
            </li>
            <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white' }} onClick={handleLogin}>로그인</button></li>
            <li><button className="sign-button" style={{ backgroundColor: '#c2c2c2', color: 'black'}}><FcGoogle /> 구글 계정으로 로그인</button></li>
            <li><button className="sign-button" style={{ backgroundColor: '#34e85b', color: 'black'}}><SiNaver /> 네이버 계정으로 로그인</button></li>
            <li><button className="sign-button" style={{ backgroundColor: '#ffec1b', color: 'black'}}><SiKakaotalk /> 카카오 계정으로 로그인</button></li>
          </>
        ) : (
          <li><button className="sign-button" style={{ backgroundColor: '#f44336', color: 'white' }} onClick={handleLogout}>로그아웃</button></li>
        )}
      </ul>
    </div>
  );
}

export default SignBar;