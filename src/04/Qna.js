import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
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


  return (
    <div className="flex h-screen">
    {/* 왼쪽 고정 */}
    <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
      <Left />
    </div>

    {/* 오른쪽 고정 */}
    <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
      <Right />
    </div>

    {/* 중앙 콘텐츠 */}
    <div className="flex-1 ml-[20%] mr-[20%] p-10">
      <div className="font-bold text-2xl mt-6">
      Q & A
      </div>
      <div className='mt-6'>
        <h1>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
        <h1>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
        <h1>- 게시글은 수정 및 삭제할 수 없습니다. </h1>
        <h1>- 관리자만 답변등록 및 수정, 삭제할 수 있습니다. </h1>
      </div>
      <table>
        <thead>
          <tr>
            <th className="text-center">번호</th>
            <th className="text-center">제목</th>
            <th className="text-center">작성자</th>
            <th className="text-center border border-gray-300 p-2">작성일</th>
          </tr>
        </thead>
        <tbody>
            {qnas.map((qna, index) => (
              <tr key={qna.qnaId} className="cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/qna/${qna.qnaId}`)}>
                <td className="text-center border border-gray-300 p-2">{index + 1}</td>
                <td className="text-center border border-gray-300 p-2">{qna.title}</td>
                <td className="text-center border border-gray-300 p-2">{qna.username}</td>
                <td className="text-center border border-gray-300 p-2">
                  {new Date(qna.createDate).toLocaleDateString()} {new Date(qna.createDate).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      <div className="flex justify-center mt-6">
          <button className="sign-button mb-16" onClick={() => navigate("/qna/write")}>
            작성하기
          </button>
      </div>
    </div>
  </div>
  );
}

export default Qna;