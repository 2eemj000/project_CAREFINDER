import './qnadetail.css';
import Left from '../Compo/Left';
import Right from '../Compo/Right';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function QnaDetail() {
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [qnaReplies, setQnaReplies] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`http://localhost:8080/qna/${id}`)
      .then(response => response.json())
      .then(data => {
        setQna(data);
      })
      .catch(error => console.error('Failed to fetch qna:', error));
    
    fetch(`http://localhost:8080/qna/reply/${id}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const comments = data.map(comment => ({
            qnaReId: comment.qnaReId,
            content: comment.content,
            createDate: comment.createDate,
            username: comment.member.username
          }));
          setQnaReplies(comments);
        } else {
          console.error('Expected an array of comments');
        }
      })
      .catch(error => console.error('Failed to fetch comments:', error));
  }, [id]);

  const handleCommentSubmit = () => {
    const member = JSON.parse(sessionStorage.getItem("member"));

    if (!member || !member.username) {
      alert("로그인이 필요합니다.");
      return;
    }

    fetch(`http://localhost:8080/qna/reply/write/${id}`, {
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

  if (!qna) {
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
                <th className="bg-[#f2f2f2] text-center font-bold text-2xl p-4">{qna.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-white p-4">
                  {qna.content}
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
            {qnaReplies.length > 0 ? (
              qnaReplies.map(comment => {
                const { date, time } = formatDate(comment.createDate);
                return (
                  <tr key={comment.qnaReId}>
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
          <button className="action-button list-button" onClick={() => navigate("/qna")}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default QnaDetail;
