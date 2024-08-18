import './comdetail.css';
import Left from '../Compo/Left';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Compo/Footer.js';

function ComDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [boardRe, setBoardRe] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [author, setAuthor] = useState(""); // 게시글 작성자 정보
  const navigate = useNavigate();
  const textareaRef = useRef(null); // 수정 시 커서 위치 조정

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      return {
        date: '알 수 없는 날짜',
        time: '알 수 없는 시간'
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

  useEffect(() => {
    // 게시글 데이터 가져오기
    fetch(`http://localhost:8080/community/${id}`)
      .then(response => response.json())
      .then(data => {
        setBoard(data);
        setEditedContent(data.content);
        setAuthor(data.username); // 게시글 작성자 정보 저장
      })
      .catch(error => console.error('게시글 가져오기 실패:', error));

    // 댓글 데이터 가져오기
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
          console.error('댓글 데이터 형식 오류');
        }
      })
      .catch(error => console.error('댓글 가져오기 실패:', error));
  }, [id]);

  const handleDelete = () => {
    const member = JSON.parse(sessionStorage.getItem("user"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (member.username !== author) {
      alert("해당 게시글의 작성자만 게시글 삭제가 가능합니다.");
      return;
    }

    fetch(`http://localhost:8080/community/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          navigate('/community');
        } else {
          console.error('게시글 삭제 실패');
        }
      });
  };

  const handleCommentSubmit = () => {
    const member = JSON.parse(sessionStorage.getItem("user"));


    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
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
          console.error('댓글 작성 실패');
        }
      });
  };

  const handleEditToggle = () => {
    const member = JSON.parse(sessionStorage.getItem("user"));


    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (member.username === author) {
      setIsEditing(!isEditing);
      if (!isEditing) {
        // 수정 모드로 전환되면 커서가 textarea에 위치하도록 설정
        setTimeout(() => {
          textareaRef.current?.focus();
        }, 0);
      }
    } else {
      alert("해당 게시글의 작성자만 게시글 수정이 가능합니다.");
    }
  };

  const handleEditSubmit = () => {
    const member = JSON.parse(sessionStorage.getItem("user"));


    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (member.username !== author) {
      alert("해당 게시글의 작성자만 게시글 수정이 가능합니다.");
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
          console.error('게시글 수정 실패');
        }
      });
  };

  if (!board) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0" >
        <div className="mt-6">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="bg-[#f2f2f2] font-bold p-4" style={{ fontSize: '0.9rem' }}>{board.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-white p-4">
                  {isEditing ? (
                    <textarea
                      ref={textareaRef}
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
        <div className="m-3 mt-10 font-bold" style={{ fontSize: '0.9rem' }}> 댓글</div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">작성자</th>
              <th scope="col" className="text-center px-6 py-3">내용</th>
              <th scope="col" className="text-center px-6 py-3">작성 날짜</th>
            </tr>
          </thead>
          <tbody>
            {boardRe.length > 0 ? (
              boardRe.map(comment => {
                const { date, time } = formatDate(comment.createDate);
                return (
                  <tr key={comment.boardReId}>
                    <td className="reply text-center">{comment.username}</td>
                    <td className="pl-3 pr-3">{comment.content}</td>
                    <td className="text-center">
                      <div>{date}</div>
                      <div>{time}</div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={board.boardId}>
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
          <button className="action-button comment-button mt-2" onClick={handleCommentSubmit} style={{ fontSize: '0.9rem' }}>댓글 달기</button>
          {isEditing ? (
            <button className="action-button edit-button" onClick={handleEditSubmit} style={{ fontSize: '0.9rem' }}>수정 완료</button>
          ) : (
            <button className="action-button edit-button" onClick={handleEditToggle} style={{ fontSize: '0.9rem' }}>수정</button>
          )}
          <button className="action-button delete-button" onClick={handleDelete} style={{ fontSize: '0.9rem' }} >삭제</button>
          <button className="action-button list-button" onClick={() => navigate("/community")} style={{ fontSize: '0.9rem' }}>목록으로</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ComDetail;
