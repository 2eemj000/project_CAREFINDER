import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js'
import './qna.css';

function Qna() {
  const [qnas, setQnas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQnas = async () => {
      try {
        const response = await fetch('http://localhost:8080/qna');
        const data = await response.json();
        setQnas(data);
      } catch (error) {
        console.error('Failed to fetch Q&As:', error);
      }
    };

    fetchQnas();
  }, []);

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      return {
        date: 'Unknown Date',
        time: 'Unknown Time'
      };
    }

    const formattedDate = dateObj.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('ko-KR');

    return {
      date: formattedDate,
      time: formattedTime
    };
  }

  function handleQnaClick(qnaId) {
    if (qnaId) {
      navigate(`/qna/${qnaId}`);
    } else {
      console.error('Invalid qna ID');
    }
  }

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex-1 ml-[15%] mr-[20%] p-10 z-0">
        <div className="font-bold mt-6" style={{ fontSize: '1.2rem' }}>
          Q & A
        </div>
        <div className='mt-6' >
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글은 수정 및 삭제할 수 없습니다. </h1>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="text-center px-6 py-3">번호</th>
              <th scope="col" className="text-center px-6 py-3">제목</th>
              <th scope="col" className="text-center px-6 py-3">작성자</th>
              <th scope="col" className="text-center px-6 py-3">작성일</th>
            </tr>
          </thead>
          <tbody>
            {qnas.map((qna, index) => {
              const { date, time } = formatDate(qna.createDate);
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={qna.qnaId}>
                  <td className="text-center">{index + 1}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleQnaClick(qna.qnaId)}
                  >
                    {qna.title}
                  </td>
                  <td className="text-center">{qna.member.username}</td>
                  <td className="text-center">
                    <div>{date}</div>
                    <div>{time}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="sign-button" onClick={() => navigate("/qna/write")}>
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qna;