import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left';
import './qna.css';
import Footer from '../Compo/Footer.js';

function Qna() {
  const [qnas, setQnas] = useState([]);
  const [user, setUser] = useState(null); // 로그인된 사용자 정보를 상태로 저장
  const [loading, setLoading] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수

  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:8080/checkSession', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.username);
        setLoginMessage(`${data.username}님, 반갑습니다!`);
        return true; // 로그인 성공 시 true 반환
      } else if (response.status === 401) {
        setUser(null);
        setLoginMessage('로그인 정보가 없습니다. 다시 로그인 해주세요.');
        return false; // 로그인 실패 시 false 반환
      } else {
        setUser(null);
        setLoginMessage('세션 확인 중 문제가 발생했습니다.');
        return false;
      }
    } catch (error) {
      console.error('세션 확인 실패:', error);
      setUser(null);
      setLoginMessage('세션 확인 중 오류가 발생했습니다.');
      return false;
    }
  };

  const fetchQnas = async () => {
    try {
      const response = await fetch('http://localhost:8080/qna');

      if (response.ok) {
        const data = await response.json();
        setQnas(data);
      } else {
        console.error('게시글 데이터 가져오기 실패:', response.status);
        setErrorMessage('게시글 데이터 가져오기 실패');
      }
    } catch (error) {
      console.error('게시글 데이터 가져오기 실패:', error);
      setErrorMessage('게시글 데이터 가져오기 실패');
    }
  };

  const fetchData = async () => {
    setLoading(true); // 로딩 상태 시작

    await checkSession();
    await fetchQnas();

    setLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
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
  };

  const handleQnaClick = (qnaId) => {
    if (qnaId) {
      navigate(`/qna/${qnaId}`);
    } else {
      console.error('Invalid qna ID');
    }
  };

  async function handleWriteClick() {
    if (user) {
      navigate("/qna/write");
    } else {
      const loggedIn = await checkSession(); // 로그인 상태를 다시 확인
      if (loggedIn) {
        navigate("/qna/write"); // 세션 확인 후 바로 글쓰기 페이지로 이동
      } else {
        alert("로그인 후에 게시글을 작성할 수 있습니다.");
      }
    }
  }

  //페이징 관한 부분
  const sortedQnas = [...qnas].sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
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
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0">
        <div className="font-bold text-2xl mt-6" style={{ fontSize: '1.2rem' }}>
          QnA 게시판
        </div>
        <div className='mt-6'>
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
          <h1 style={{ fontSize: '0.9rem' }}>- 게시글은 관리자 외 답변하기 및 삭제하기가 불가합니다. </h1>
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
                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={qna.qnaId}>
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
