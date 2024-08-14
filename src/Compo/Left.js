import React from 'react';
import '../NavigationBar.css';
import logo from '../Img/Logo-white.png';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Find from '../01/Find.js';
import CardDetail from '../01/CardDetail.js'; 
import Health from '../02/Health.js'; 
import Community from '../03/Community.js'; 
import Qna from '../04/Qna.js';
import MainApp from '../App.js'
  
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
        </ul>
    </div>
  );
}

export default NavigationBar;