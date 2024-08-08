import './comdetail.css';
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ComDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [boardRe, setBoardRe] = useState([]);  // 댓글 데이터
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/community/${id}`)
    .then(response => response.json())
    .then(data => setBoard(data))

    fetch(`http://localhost:8080/communityre/${id}`)
    .then(response => response.json())
    .then(data => setBoardRe(data));
}, [id]);

  if (!board) {
    return <div>Loading...</div>;
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
          <tbody>
            {boardRe.map((comment) => (
              <tr key={comment.boardReId}>
                <td className="reply">{comment.username}</td>
                <td className='pl-3 pr-3'>{comment.content}</td>
                <td className='text-center'>
                  {new Date(comment.createDate).toLocaleDateString()} {new Date(comment.createDate).toLocaleTimeString()}
                </td>
              </tr>
            ))}
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