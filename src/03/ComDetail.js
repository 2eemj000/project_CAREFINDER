import './comdetail.css';
import Left from '../Compo/Left';
import Right from '../Compo/Right';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ComDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [boardRe, setBoardRe] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const navigate = useNavigate();

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
    const formattedTime = dateObj.toLocaleTimeString('ko-KR');
  
    return `${formattedDate}\n${formattedTime}`;
  }

  useEffect(() => {
    fetch(`http://localhost:8080/community/${id}`)
      .then(response => response.json())
      .then(data => {
        setBoard(data);
        setEditedContent(data.content);
      })
      .catch(error => console.error('Failed to fetch board:', error));
    
    fetch(`http://localhost:8080/community/reply/${id}`)
      .then(response => response.json())
      .then(data => {
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

  const handleDelete = () => {
    const member = JSON.parse(sessionStorage.getItem("member"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

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

  const handleCommentSubmit = () => {
    const member = JSON.parse(sessionStorage.getItem("member"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8080/community/reply/write/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment })
    })
      .then(response => {
        if (response.ok) {
          setNewComment("");
          window.location.reload();
        } else {
          console.error('Failed to post comment');
        }
      });
  };

  const handleEditToggle = () => {
    const member = JSON.parse(sessionStorage.getItem("member"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    const member = JSON.parse(sessionStorage.getItem("member"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      navigate('/signin');
      return;
    }

    fetch(`http://localhost:8080/community/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editedContent })
    })
      .then(response => {
        if (response.ok) {
          setIsEditing(false);
          setBoard({ ...board, content: editedContent });
        } else {
          console.error('Failed to update the board');
        }
      });
  };

  if (!board) {
    return <div>Loading...</div>;
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
        <div className="mt-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-[#f2f2f2] text-center font-bold text-2xl p-4">{board.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-white p-4">
                  {isEditing ? (
                    <textarea
                      className="w-full p-2 border border-gray-300"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    board.content
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="m-3 mt-10 text-xl font-bold">댓글</div>
        <table className="mt-3 w-full">
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
                  <td className="reply text-center">{comment.username}</td>
                  <td className="pl-3 pr-3">{comment.content}</td>
                  <td className="text-center">
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
        <div className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          
        </div>
        <div className="flex justify-between mt-6">
          <button className="action-button comment-button mt-2" onClick={handleCommentSubmit}>댓글 달기</button>
          {isEditing ? (
            <button className="action-button edit-button" onClick={handleEditSubmit}>수정 완료</button>
          ) : (
            <button className="action-button edit-button" onClick={handleEditToggle}>수정</button>
          )}
          <button className="action-button delete-button" onClick={handleDelete}>삭제</button>
          <button className="action-button list-button" onClick={() => navigate("/community")}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default ComDetail;