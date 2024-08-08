import './qnadetail.css';
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function QnaDetail() {
  const { id } = useParams();
  const [qna, setQna] = useState(null);
  const [qnaRe, setQnaRe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQnaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/qna/${id}`);
        const data = await response.json();
        setQna(data);
      } catch (error) {
        console.error('Failed to fetch Q&A details:', error);
      }
    };

    const fetchQnaRe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/qnare/${id}`);
        const data = await response.json();
        setQnaRe(data);
      } catch (error) {
        console.error('Failed to fetch Q&A responses:', error);
      }
    };

    fetchQnaDetails();
    fetchQnaRe();
  }, [id]);

  if (!qna) {
    return <div>Loading...</div>;
  }

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
      <div className="mt-6">
          <p>{qna.content}</p>
        </div>
        <div className="m-3 mt-10 text text-xl font-bold">답변</div>
        <table className="w-full mt-3 border-collapse border border-gray-300">
          <tbody>
            {qnaRe.map((re) => (
              <tr key={re.qnaReId}>
                <td className="text-center border border-gray-300 p-2">{re.username}</td>
                <td className="text-left border border-gray-300 p-2">{re.content}</td>
                <td className="text-center border border-gray-300 p-2">
                  {new Date(re.createDate).toLocaleDateString()} {new Date(re.createDate).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <button className="action-button comment-button">댓글 달기</button>
          <button className="action-button edit-button">수정</button>
          <button className="action-button delete-button">삭제</button>
          <button className="action-button list-button" onClick={() => navigate("/qna")}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export default QnaDetail;