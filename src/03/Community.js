import React from 'react';
import './community.css';

function Community() {
  const data = Array.from({ length: 10 }, (_, index) => ({
    번호: index + 1,
    제목: `제목 ${index + 1}`,
    작성자: `작성자 ${index + 1}`,
  }));

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.번호}>
              <td>{item.번호}</td>
              <td>{item.제목}</td>
              <td>{item.작성자}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Community;