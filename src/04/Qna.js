import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import Footer from '../Compo/Footer.js';
import './qna.css';
import { checkSession } from '../utils/authUtils'; // 유틸리티 함수 가져오기

function Qna() {
  const [qnas, setQnas] = useState([]);

  const [filteredQnas, setFilteredQnas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title"); // 검색 카테고리 상태 추가

  const [user, setUser] = useState(null); // 로그인된 사용자 정보를 상태로 저장
  const [loading, setLoading] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수

  const navigate = useNavigate();

  // QnA 게시글 데이터 가져오기
  const fetchQnas = async () => {
    try {
      const response = await fetch('http://localhost:8080/qna');

      if (response.ok) {
        const data = await response.json();

        // 각 QnA에 대해 Reply 데이터를 가져와서 결합
        const qnasWithReplies = await Promise.all(data.map(async (qna) => {
          const repliesResponse = await fetch(`http://localhost:8080/qna/reply/${qna.qnaId}`);
          if (repliesResponse.ok) {
            const replies = await repliesResponse.json();
            return { ...qna, replies }; // QnA에 Replies를 추가하여 반환
          }
          return { ...qna, replies: [] }; // Reply를 못 가져오면 빈 배열로 반환
        }));

        setQnas(qnasWithReplies);
      } else {
        console.error('게시글 데이터 가져오기 실패:', response.status);
        setErrorMessage('게시글 데이터 가져오기 실패');
      }
    } catch (error) {
      console.error('게시글 데이터 가져오기 실패:', error);
      setErrorMessage('게시글 데이터 가져오기 실패');
    } finally {
      setLoading(false);
    }
  };

  // 로그인 상태 확인 및 QnA 데이터 가져오기
  const fetchData = async () => {
    setLoading(true); // 로딩 상태 시작

    const sessionData = await checkSession();
    if (sessionData.loggedIn) {
      setUser(sessionData.username);
      setLoginMessage(sessionData.message);
    } else {
      setUser(null);
      setLoginMessage(sessionData.message);
    }

    await fetchQnas();

    setLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 검색어와 검색 카테고리에 따라 필터링
    const filtered = qnas.filter(qnas => {
      switch (searchCategory) {
        case "title":
          return qnas.title.toLowerCase().includes(searchTerm.toLowerCase());
        case "author":
          return qnas.member.username.toLowerCase().includes(searchTerm.toLowerCase());
        case "content":
          return qnas.content.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return qnas.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredQnas(filtered);
    setCurrentPage(1);
  }, [searchTerm, searchCategory, qnas]);


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

  // QnA 클릭 시 상세 페이지로 이동
  const handleQnaClick = (qnaId) => {
    if (qnaId) {
      navigate(`/qna/${qnaId}`);
    } else {
      console.error('Invalid qna ID');
    }
  };

  // 글쓰기 클릭 시 로그인 상태 확인 후 이동
  const handleWriteClick = async () => {
    if (user) {
      navigate("/qna/write");
    } else {
      const sessionData = await checkSession(); // 로그인 상태를 다시 확인
      if (sessionData.loggedIn) {
        setUser(sessionData.username); // 세션이 확인되면 사용자 정보 업데이트
        navigate("/qna/write"); // 세션 확인 후 바로 글쓰기 페이지로 이동
      } else {
        alert("로그인 후에 게시글을 작성할 수 있습니다.");
      }
    }
  };

  // 페이징 관련 부분
  const sortedQnas = [...filteredQnas].sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  const totalPages = Math.ceil(sortedQnas.length / itemsPerPage);
  const paginatedQnas = sortedQnas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0" style={{ marginLeft: "250px" }}>
        <div className="font-bold text-2xl mt-6" style={{ fontSize: '1.2rem' }}>
          QnA 게시판
        </div>
        <div className='mt-6'>
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글은 관리자 외 답변하기 및 삭제하기가 불가합니다. </h1>
        </div>

        {/* 검색 카테고리 셀렉트 박스 추가 */}
        <div className="mb-4 flex justify-end space-x-2 items-center">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="p-1 text-sm border border-gray-300 rounded-md"
            style={{ width: '120px' }} // 셀렉트 박스의 너비 조정
          >
            <option value="title">제목</option>
            <option value="author">작성자</option>
            <option value="content">내용</option>
          </select>

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 text-sm border border-gray-300 rounded-md"
            style={{ width: '200px' }} // 입력 필드의 너비 조정
          />
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">번호</th>
              <th scope="col" className="text-center px-6 py-3">제목</th>
              <th scope="col" className="text-center px-6 py-3">작성자</th>
              <th scope="col" className="text-center px-6 py-3">작성일</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQnas.map((qna, index) => {
              const { date, time } = formatDate(qna.createDate);
              const qnasNumber = sortedQnas.length - (currentPage - 1) * itemsPerPage - index;

              return (
                <React.Fragment key={qna.qnaId}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="text-center">{qnasNumber}</td>
                    <td className="cursor-pointer" onClick={() => handleQnaClick(qna.qnaId)}>
                      {qna.title}
                    </td>
                    <td className="text-center">{qna.member.username}</td>
                    <td className="text-center">
                      <div>{date}</div>
                      <div>{time}</div>
                    </td>
                  </tr>
                  {qna.replies.map((reply, replyIndex) => {
                    const replyDate = formatDate(reply.createDate);
                    return (
                      <tr key={`reply-${qna.qnaId}-${replyIndex}`} className="bg-gray-100">
                        <td colSpan="4" className="text-left pl-6">
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-2">→</span>
                            <strong>답변 : </strong> {reply.content.length > 50 ? `${reply.content.substring(0, 50)}...` : reply.content}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className="mt-10 mb-5 flex justify-end w-full">
          <button
            onClick={handleWriteClick}
            style={{
              fontSize: 'medium',
              textDecoration: 'none',
              padding: '0.5rem',
              width: '20%',
              borderRadius: '20px',
              cursor: 'pointer',
              backgroundColor: '#929292',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              fontWeight: 'bold',
              color: 'white'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#686767';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#929292';
              e.target.style.color = 'white';
            }}
          >
            질문하기
          </button>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:underline'}`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 text-sm font-medium ${currentPage === index + 1 ? 'text-blue-500 underline' : 'text-gray-500 hover:underline'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:underline'}`}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Qna;