import React, { useState } from 'react';
import '../SignBar.css';
import { FcGoogle } from "react-icons/fc";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import Signup from './SignUp.js';

function SignBar() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //현재 보여지는 상태 관리
  const [showSignup, setShowSignup] = useState(false);

  // 로그인 및 로그아웃 핸들러
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  //회원가입 버튼 클릭 핸들러
  const handleSignup = () => setShowSignup(true);

  return (
    <div>
      <div style={{ width: '20%', height: '100vh', backgroundColor: '#eeeeee', position: 'fixed', right: 0, padding: 0 }}>
        <ul className="sign-list">
          {!isLoggedIn ? (
            <>
              <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white' }} onClick={handleSignup}>회원가입</button></li>
              <li className="input-section">
                <input type="text" id="userId" className="input-field" placeholder="아이디 또는 전화번호 입력" />
                <input type="password" id="password" className="input-field" placeholder="비밀번호 입력" />
              </li>
              <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white' }} onClick={handleLogin}>로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#c2c2c2', color: 'black' }}><FcGoogle className="icon" /> 구글 계정으로 로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#34e85b', color: 'black' }}><SiNaver className="icon" /> 네이버 계정으로 로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#ffec1b', color: 'black' }}><SiKakaotalk className="icon" /> 카카오 계정으로 로그인</button></li>
            </>
          ) : (
            <li><button className="sign-button" style={{ backgroundColor: '#f44336', color: 'white' }} onClick={handleLogout}>로그아웃</button></li>
          )}
        </ul>
      </div>

      {showSignup && (
        <div className="overlay">
          <Signup />
          <button className="close-button" onClick={() => setShowSignup(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default SignBar;