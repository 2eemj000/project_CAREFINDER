import React, { useState } from 'react';
import logoImage from '../Img/Logo.png';

export default function Signup({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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
        if (!value) errorMsg = '사용자 이름을 입력하세요.';
        break;
      case 'email':
        if (!value.includes('@')) errorMsg = '유효한 이메일 주소를 입력하세요.';
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

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/signup/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.exists; 
      } else {
        throw new Error('이메일 중복 확인 실패');
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      alert('이미 등록된 이메일 주소입니다.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formData).forEach(key => validateField(key, formData[key]));

    if (Object.values(errors).some(error => error)) {
      return;
    }

    if (!isChecked) {
      alert('약관 동의를 체크해주세요.');
      return;
    }

    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: '이미 등록된 이메일 주소입니다.'
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('회원가입에 성공했습니다.');
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        }
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={logoImage} alt="Logo" className="logo" />
        <button onClick={onClose} className="close-button">X</button>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>사용자 이름</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={() => validateField('username', formData.username)}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateField('email', formData.email)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => validateField('password', formData.password)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label>약관 동의</label>
          </div>
          <button type="submit">회원가입</button>
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
}