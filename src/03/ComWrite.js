import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import './comwrite.css';

function ComWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 세션에서 member 정보 가져오기
    const member = JSON.parse(sessionStorage.getItem("user"));

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

    fetch('http://localhost:3000/community/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/community');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0">
        <div className="font-bold text-2xl mt-6">
          게시글 작성
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

export default ComWrite;
