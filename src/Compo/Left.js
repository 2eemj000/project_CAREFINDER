import React from 'react';
import '../NavigationBar.css';
import logo from '../Img/Logo.png';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../01/Home.js';
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
    <div style={{ width: '20%', height: '100vh', backgroundColor: '#eeeeee', position: 'fixed', padding: 0 }}>
        <ul className="nav-list">
            <li className="logo">
                <img
                  src={logo}
                  alt="carefinder-logo"
                  onClick={() => navigate('/')} // 메인 화면으로 돌아가기
                  style={{ cursor: 'pointer' }}
                />
            </li>
            <li onClick={() => navigate('/find')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
              내 맘에 쏙 병원찾기
            </li>
            <li onClick={() => navigate('/health')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
              시니어 건강매거진
            </li>
            <li onClick={() => navigate('/community')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
              너도 아파? 나도 아파!
            </li>
            <li onClick={() => navigate('/qna')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
              Q & A
            </li>
        </ul>
    </div>
  );
}

export default NavigationBar;