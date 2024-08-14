import React, { useState, useEffect } from 'react';
import '../SignBar.css';
import { FcGoogle } from "react-icons/fc";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import Signup from './SignUp.js';

function SignBar() {
  // 로그인 상태 및 사용자 정보 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // 세션 상태를 확인하는 useEffect 훅
 // useEffect(() => {
  //  const checkSession = async () => {
  //      try {
   //         const response = await fetch('http://localhost:8080/checkSession', {
   //             credentials: 'include', // 세션 쿠키를 포함
   //         });
   //         if (response.ok) {
   //             const data = await response.json();
   //             sessionStorage.setItem('user', JSON.stringify(data)); // 로그인 정보를 세션 스토리지에 저장
   //             setIsLoggedIn(true);
   //             setUsername(data.username);
   //             setLoginMessage(`${data.username}님, 반갑습니다!`);
   //         } else {
   //             setIsLoggedIn(false);
   //         }
   //     } catch (error) {
   //         console.error('세션 확인 실패:', error);
   //         setIsLoggedIn(false);
   //     }
   // };
    //checkSession();
//}, []);

  // 로그인 핸들러
  const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // 세션 쿠키를 포함
        });

        console.log(response.status);  // 서버 응답 상태 코드 출력

        if (response.ok) {
            setIsLoggedIn(true);
            setLoginMessage(`${username}님, 반갑습니다!`);
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

  // 회원가입 창 열기
  const handleSignup = () => setShowSignup(true);

  // 로그아웃 핸들러
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // 세션 스토리지에서 사용자 정보 삭제
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginMessage('');
  };

  return (
    <div>
      <div style={{ width: '20%', height: '100vh', backgroundColor: '#eeeeee', position: 'fixed', right: 0, padding: 0 }}>
        <ul className="sign-list">
          {!isLoggedIn ? (
            <>
              <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white' }} onClick={handleSignup}>회원가입</button></li>
              <li className="input-section">
                <input
                  type="text"
                  id="userId"
                  className="input-field"
                  placeholder="이름 또는 닉네임 입력"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li><button className="sign-button" style={{ backgroundColor: '#2d80f5', color: 'white', marginTop: -9 }} onClick={handleLogin}>로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#c2c2c2', color: 'black' }}><FcGoogle className="icon" /> 구글 계정으로 로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#34e85b', color: 'black' }}><SiNaver className="icon" /> 네이버 계정으로 로그인</button></li>
              <li><button className="sign-button" style={{ backgroundColor: '#ffec1b', color: 'black' }}><SiKakaotalk className="icon" /> 카카오 계정으로 로그인</button></li>
            </>
          ) : (
            <li>
              <div className="welcome-message">{loginMessage}</div>
              <button className="sign-button" style={{ backgroundColor: '#f44336', color: 'white' }} onClick={handleLogout}>로그아웃</button>
            </li>
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
