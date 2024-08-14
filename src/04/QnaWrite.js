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
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="fixed right-0 top-0 w-1/6 h-full z-10">
        <Right />
      </div>
      <div className="flex-1 ml-[15%] mr-[20%] p-10 z-0">
        <div className="font-bold mt-6 mb-10" style={{ fontSize: '1.2rem' }}>
        질문하기
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-2xl border border-gray-200">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="peer block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder=" "
                required
              />
              <label
                htmlFor="title"
                className="absolute top-3 left-4 text-md text-gray-600 transition-transform duration-300 transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-1/2 peer-focus:text-blue-600"
              >
                제목
              </label>
            </div>
          </div>
          <div className="mb-8">
            <div className="relative">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="peer block w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                rows="10"
                placeholder=" "
                required
              />
              <label
                htmlFor="content"
                className="absolute top-3 left-4 text-md text-gray-600 transition-transform duration-300 transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-1/2 peer-focus:text-blue-600"
              >
                내용
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QnaWrite;
