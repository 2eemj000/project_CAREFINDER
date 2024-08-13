import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import Right from '../Compo/Right';
import './community.css';

function Community() {
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(null); // 로그인된 사용자 정보를 상태로 저장
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    fetch('http://localhost:8080/auth/status', {
      credentials: 'include', // 쿠키를 포함하여 요청
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Not logged in');
      }
    })
    .then(data => setUser(data))
    .catch(error => console.error('Login check error:', error));

    // 게시글 데이터 가져오기
    fetch('http://localhost:8080/community',{
      credentials: 'include', // 쿠키를 포함하여 요청
    })
    .then(response => response.json())
    .then(data => setBoards(data))
    .catch(error => console.error('Fetch error:', error));
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

  function handleBoardClick(boardId) {
    if (boardId) {
      navigate(`/community/${boardId}`);
    } else {
      console.error('Invalid board ID');
    }
  }

  function handleWriteClick() {
    if (user) {
      navigate("/community/write");
    } else {
      alert("로그인 후에 게시글을 작성할 수 있습니다.");
    }
  }

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
          너도 아파? 나도 아파!
        </div>
        <div className='mt-6'>
          <h1>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
          <h1>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
          <h1>- 게시글의 작성자 본인 및 관리자만 해당 게시글을 수정 및 삭제할 수 있습니다.</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th className="text-center">번호</th>
              <th className="text-center">제목</th>
              <th className="text-center">작성자</th>
              <th className="text-center">작성 날짜</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) => {
              const { date, time } = formatDate(board.createDate);
              return (
                <tr key={board.boardId}>
                  <td className="text-center">{index + 1}</td>
                  <td 
                    className="cursor-pointer"
                    onClick={() => handleBoardClick(board.boardId)}
                  >
                    {board.title}
                  </td>
                  <td className="text-center">{board.member.username}</td>
                  <td className="text-center">
                    <div>{date}</div>
                    <div>{time}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <button className="sign-button mb-16" onClick={handleWriteClick}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
