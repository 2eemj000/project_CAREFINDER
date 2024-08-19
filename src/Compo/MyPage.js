import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../utils/authUtils'; // 세션 확인 유틸리티
import './MyPage.css'; 

function MyPage({ onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionData = await checkSession();
        if (sessionData.loggedIn) {
          setUserInfo({
            username: sessionData.username,
            email: sessionData.email
          });

          const response = await fetch('http://localhost:8080/user/posts', {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const posts = await response.json();
            setUserPosts(posts);
          } else {
            console.error('게시글 로딩 실패');
            alert('게시글 로딩에 실패했습니다.');
          }
        } else {
          navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        alert('데이터 로딩 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
     <div className="modal-overlay">
       <div className="modal-content">
         <button className="close-button" onClick={onClose}>×</button>
         <div className="font-[sans-serif] relative">
           <div className="relative m-4">
             <div className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl">
               {loading ? (
                 <p className="text-center text-gray-500">로딩 중...</p>
               ) : userInfo ? (
                 <>
                   <div className="text-center mb-6">
                     <h2 className="text-2xl font-semibold text-gray-800 mb-2">안녕하세요, {userInfo.username}님!</h2>
                     <p className="text-gray-600">이메일: {userInfo.email}</p>
                   </div>
                   <div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-4">내가 작성한 게시글</h3>
                     <ul className="space-y-3">
                       {userPosts.length > 0 ? (
                         userPosts.map(post => (
                           <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-200 transition-colors">
                             <a href={`/post/${post.id}`} className="text-blue-600 hover:underline">
                               {post.title}
                             </a>
                           </li>
                         ))
                       ) : (
                         <p className="text-center text-gray-500">작성한 게시글이 없습니다.</p>
                       )}
                     </ul>
                   </div>
                 </>
               ) : (
                 <p className="text-center text-gray-500">정보를 불러오는 중 오류가 발생했습니다.</p>
               )}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default MyPage;