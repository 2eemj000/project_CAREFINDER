import React from 'react';
import '../NavigationBar.css';
import logo from '../Img/Logo.png';

function NavigationBar() {
  return (
    <div style={{ width: '20%', height: '100vh', backgroundColor: '#eeeeee', position: 'fixed', padding: 0 }}>
        <ul className="nav-list">
            <li className="logo">
                <img
                src={logo}
                alt="carefinder-logo"
                />
            </li>
            <li><a href="#find">내 맘에 쏙 병원찾기</a></li>
            <li><a href="#health">시니어 건강매거진</a></li>
            <li><a href="#community">너도 아파? 나도 아파!</a></li>
            <li><a href="#qna">Q & A</a></li>
        </ul>
    </div>
  );
}

export default NavigationBar;