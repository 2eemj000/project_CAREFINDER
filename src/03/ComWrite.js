import React from 'react';
import './comwrite.css';
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'


function ComWrite() {
  const data = Array.from({ length: 10 }, (_, index) => ({
    번호: index + 1,
    제목: `제목 ${index + 1}`,
    작성자: `작성자 ${index + 1}`,
    내용: `내용 ${index + 1}`
  }));

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
      너도 아파? 나도 아파!
      </div>
      <div className='mt-6'>
        <h1>- 게시글의 제목을 선택하면 상세정보를 확인하실 수 있습니다.</h1>
        <h1>- 로그인 후, 게시글을 작성할 수 있습니다.</h1>
        <h1>- 게시글의 작성자 본인 및 관리자만 해당 게시글을 수정 및 삭제할 수 있습니다.</h1>
      </div>
        <table>
          <thead className="mb-6">
            <tr>
              <th className="text-center">제목</th>
            </tr>
          </thead>
          <tbody>
                <td>내용</td>
          </tbody>
        </table>
        <div className="m-3 mt-10 text text-xl font-bold">댓글</div>
        <table className="mt-3">
          <tbody>
            {data.map((item) => (
              <tr key={item.번호}>
                <td className="reply">{item.작성자}</td>
                <td className='pl-3 pr-3'>{item.내용}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
        <button className="action-button comment-button">댓글 달기</button>
          <button className="action-button edit-button">수정</button>
          <button className="action-button delete-button">삭제</button>
          <button className="action-button list-button">목록으로</button>
        </div>
    </div>
  </div>
  );
}

export default ComWrite;