import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import Right from '../Compo/Right';
import './qnawrite.css';

function QnaWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 세션에서 member 정보 가져오기
    const member = JSON.parse(sessionStorage.getItem("member"));

    // member가 없으면 경고창 띄우기
    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newPost = {
      title,
      content,
      createDate: new Date().toISOString(), // 현재 시간 추가
      username: member.username // 작성자 정보 추가
    };

    fetch('http://localhost:3000/qna/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
    .then(response => response.json())
    .then(() => {
      navigate('/qna');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
        <Left />
      </div>
      <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
        <Right />
      </div>
      <div className="flex-1 ml-[20%] mr-[20%] p-10">
        <div className="font-bold text-2xl mt-6">
            질문 작성
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-lg font-medium">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              rows="6"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="sign-button mb-16">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QnaWrite;
