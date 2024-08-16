import React, { useState } from 'react';
import skyImage from '../Img/Sky.jpg'; // 사용할 이미지
import logoImage from '../Img/Logo.png'; // 사용할 로고
import { FcGoogle } from "react-icons/fc";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import './LoginForm.css'; 

export default function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validateField = (name, value) => {
    let errorMsg = null;
    switch (name) {
      case 'username':
        if (!value) errorMsg = '이름을 입력하세요.';
        break;
      case 'password':
        if (value.length < 8) errorMsg = '비밀번호는 8자 이상이어야 합니다.';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    Object.keys(formData).forEach(key => validateField(key, formData[key]));

    // Check if there are any validation errors
    if (Object.values(errors).some(error => error)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        setLoginMessage('로그인 성공!');
        // Handle login success (e.g., redirect, close modal)
      } else {
        const errorData = await response.json();
        setLoginMessage('로그인 실패: ' + errorData.message);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginMessage('로그인 실패');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="font-[sans-serif] relative">
          <div className="relative -mt-40 m-4">
            <form className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl" onSubmit={handleSubmit}>
              <div className="flex justify-center items-center mb-12">
                <img src={logoImage} alt="Logo" className="logo-image" />
              </div>
              <div>
                <label className="text-gray-800 block mb-1">email</label>
                <input
                  id="email"
                  type="text"
                  className={`w-full bg-transparent text-sm text-gray-800 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 px-2 py-3 outline-none`}
                  placeholder="email을 입력하세요."
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => validateField('email', formData.email)}
                />
                {errors.email && <span className="text-red-500 text-sm block mt-1">{errors.email}</span>}
              </div>

              <div className="mt-8">
                <label className="text-gray-800 block mb-1">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  className={`w-full bg-transparent text-sm text-gray-800 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 px-2 py-3 outline-none`}
                  placeholder="비밀번호를 입력하세요."
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => validateField('password', formData.password)}
                />
                {errors.password && <span className="text-red-500 text-sm block mt-1">{errors.password}</span>}
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
                  로그인
                </button>
                {loginMessage && <div className="mt-4 text-green-500">{loginMessage}</div>}
              </div>
            </form>
            <div className="oauth-buttons mt-8">
              <button className="oauth-button" style={{ backgroundColor: '#c2c2c2' }}>
                <FcGoogle className="icon" /> 구글 계정으로 로그인
              </button>
              <button className="oauth-button" style={{ backgroundColor: '#34e85b' }}>
                <SiNaver className="icon" /> 네이버 계정으로 로그인
              </button>
              <button className="oauth-button" style={{ backgroundColor: '#ffec1b' }}>
                <SiKakaotalk className="icon" /> 카카오 계정으로 로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}