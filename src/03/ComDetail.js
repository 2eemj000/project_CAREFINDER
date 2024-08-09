import './comdetail.css';
import Left from '../Compo/Left';
import Right from '../Compo/Right';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ComDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [boardRe, setBoardRe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 데이터 가져오기
    fetch(`http://localhost:8080/community/${id}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.error('Failed to fetch board:', error));
    
    // 댓글 데이터 가져오기
    fetch(`http://localhost:8080/community/reply/${id}`)
      .then(response => response.json())
      .then(data => {
        // 댓글 데이터가 배열인지 확인 후 상태 업데이트
        if (Array.isArray(data)) {
          const comments = data.map(comment => ({
            boardReId: comment.boardReId,
            content: comment.content,
            createDate: comment.createDate,
            username: comment.member.username
          }));
          setBoardRe(comments);
        } else {
          console.error('Expected an array of comments');
        }
      })
      .catch(error => console.error('Failed to fetch comments:', error));
  }, [id]);

  // 디버깅을 위해 상태 확인
  useEffect(() => {
    console.log('Board:', board);
    console.log('Comments:', boardRe);
  }, [board, boardRe]);

  if (!board) {
    return <div>Loading...</div>;
  }

  function formatDate(dateStr) {
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) {
    return 'Unknown Date';
  }

  const formattedDate = dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = dateObj.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true // 12시간제로 설정하여 오후/오전 표기
  });

  return `${formattedDate}\n${formattedTime}`;
}
  const handleDelete = () => {
    fetch(`http://localhost:8080/community/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          navigate('/community');
        } else {
          console.error('Failed to delete the board');
        }
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
          {board.title}
        </div>
        <div className='mt-6'>
          <p>{board.content}</p>
        </div>
        <div className="m-3 mt-10 text-xl font-bold">댓글</div>
        <table className="mt-3">
          <thead>
            <tr>
              <th className="text-center">작성자</th>
              <th className="text-center">내용</th>
              <th className="text-center">작성 날짜</th>
            </tr>
          </thead>
          <tbody>
            {boardRe.length > 0 ? (
              boardRe.map(comment => (
                <tr key={comment.boardReId}>
                  <td className="reply">{comment.username}</td>
                  <td className='pl-3 pr-3'>{comment.content}</td>
                  <td className='text-center'>
                    {formatDate(comment.createDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">댓글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <button className="action-button comment-button">댓글 달기</button>
          <button className="action-button edit-button">수정</button>
          <button className="action-button delete-button" onClick={handleDelete}>삭제</button>
          <button className="action-button list-button" onClick={() => navigate("/community")}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default ComDetail;
