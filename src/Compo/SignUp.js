import React from 'react'
import skyImage from '../Img/Sky.jpg';
import logoImage from '../Img/Logo.png';
import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Optionally clear errors as user types
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
      case 'name':
        if (!value) errorMsg = '이름을 입력하세요.';
        break;
      case 'email':
        if (!value.includes('@')) errorMsg = '5~50자 이내의 유효한 이메일 주소를 입력하세요.';
        break;
      case 'password':
        if (value.length < 8) errorMsg = '비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };

  return (
    <div className="font-[sans-serif] relative">
      <div className="h-[240px] font-[sans-serif] w-full">
        <img src={skyImage} alt="Logo" className="w-full object-cover h-full" />
      </div>
      <div className="relative -mt-40 m-4">
        <form className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl">
        <div className="flex justify-center items-center mb-12">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
          <div>
            <label className="text-gray-800 block mb-1"> 이름 </label>
            <input
              name="name"
              type="text"
              className={`w-full bg-transparent text-sm text-gray-800 border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 px-2 py-3 outline-none`}
              placeholder="닉네임을 입력하세요."
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => validateField('name', formData.name)}
            />
            {errors.name && <span className="text-red-500 text-sm block mt-1">{errors.name}</span>}
          </div>

          <div className="mt-8">
            <label className="text-gray-800 block mb-1">e-mail</label>
            <input
              name="email"
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
            <label className="text-gray-800 block mb-1"> 비밀번호 </label>
            <input
              name="password"
              type="password"
              className={`w-full bg-transparent text-sm text-gray-800 border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 px-2 py-3 outline-none`}
              placeholder="비밀번호를 입력하세요."
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => validateField('password', formData.password)}
            />
            {errors.password && <span className="text-red-500 text-sm block mt-1">{errors.password}</span>}
          </div>

          <div className="flex items-center mt-8">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
            <label htmlFor="remember-me" className="ml-3 block text-sm">
              CAREFINDER의 개인 정보 수집 및 이용에 동의합니다.
            </label>
          </div>

          <div className="mt-8">
            <button type="button" className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}