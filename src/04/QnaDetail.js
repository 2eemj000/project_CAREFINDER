import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import Footer from '../Compo/Footer.js';
import './qnadetail.css';

function QnaDetail() {
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [qnaReplies, setQnaReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [user, setUser] = useState(null); // 로그인된 사용자 정보
  const [userRole, setUserRole] = useState(""); // 사용자 역할 정보
  const navigate = useNavigate();

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
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
  };

  // 세션 확인 함수
  const fetchSession = async () => {
    try {
      const response = await fetch('http://localhost:8080/checkSession', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.username);
        setUserRole(data.role); // 사용자 역할 정보를 설정
      } else {
        setUser(null);
        setUserRole(null);
      }
    } catch (error) {
      console.error('세션 확인 중 오류 발생:', error);
      setUser(null);
      setUserRole(null);
    }
  };

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      await fetchSession(); // 세션 정보를 먼저 가져옴

      const qnaResponse = await fetch(`http://localhost:8080/qna/${id}`);
      if (!qnaResponse.ok) {
        throw new Error('질문 데이터 가져오기 실패');
      }
      const qnaData = await qnaResponse.json();
      setQna(qnaData);

      const repliesResponse = await fetch(`http://localhost:8080/qna/reply/${id}`);
      if (!repliesResponse.ok) {
        throw new Error('답변 데이터 가져오기 실패');
      }
      const repliesData = await repliesResponse.json();
      if (Array.isArray(repliesData)) {
        setQnaReplies(repliesData.map(reply => ({
          qnaReplyId: reply.qnaReplyId,
          content: reply.content,
          createDate: reply.createDate,
          username: reply.member.username
        })));
      } else {
        console.error('답변 데이터 형식 오류');
      }
    } catch (error) {
      console.error('질문 및 답변 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // 질문 삭제 함수
  const handleDelete = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (userRole !== "admin") {
      alert("관리자만 게시글을 삭제할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/qna/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/qna'); // 삭제 후 목록 페이지로 이동
      } else {
        console.error('질문 삭제 실패');
      }
    } catch (error) {
      console.error('질문 삭제 중 오류 발생:', error);
    }
  };

  // 답변 작성 함수
  const handleReplySubmit = async () => {
    await fetchSession(); // 세션을 최신 상태로 갱신
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (userRole !== "admin") {
      alert("관리자만 질문에 답변할 수 있습니다.");
      return;
    }

    if (newReply.trim() === "") {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/qna/reply/write/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newReply, username: user }),
        credentials: 'include',
      });

      if (response.ok) {
        setNewReply("");
        await fetchData(); // 최신 상태를 가져오기 위해 전체 데이터 갱신
      } else {
        console.error('답변 작성 실패');
      }
    } catch (error) {
      console.error('답변 작성 중 오류 발생:', error);
    }
  };

  if (!qna) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0">
        <div className="mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="bg-[#f2f2f2] font-bold p-4" style={{ fontSize: '0.9rem' }}>{qna.title}</th>
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
        <div className="m-3 mt-10 font-bold" style={{ fontSize: '0.9rem' }}> 답변</div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">작성자</th>
              <th scope="col" className="text-center px-6 py-3">내용</th>
              <th scope="col" className="text-center px-6 py-3">작성 날짜</th>
            </tr>
          </thead>
          <tbody>
            {qnaReplies.length > 0 ? (
              qnaReplies.map(reply => {
                const { date, time } = formatDate(reply.createDate);
                return (
                  <tr key={reply.qnaReplyId}>
                    <td className="reply text-center">{reply.username}</td>
                    <td className="pl-3 pr-3">{reply.content}</td>
                    <td className="text-center">
                      <div>{date}</div>
                      <div>{time}</div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan="3" className="text-center">답변이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300"
            rows="3"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="답변을 작성하세요."
          />
        </div>
        <div className="flex justify-between mt-6">
          <button className="action-button comment-button mt-2" onClick={handleReplySubmit} style={{ fontSize: '0.9rem' }}>
            답변하기
          </button>
          <button className="action-button delete-button" onClick={handleDelete} style={{ fontSize: '0.9rem' }}>
            삭제하기
          </button>
          <button className="action-button list-button" onClick={() => navigate("/qna")} style={{ fontSize: '0.9rem' }}>
            목록으로
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default QnaDetail;
