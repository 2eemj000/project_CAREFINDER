import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js';
import Right from '../Compo/Right.js';
import News from './News.js';

export default function Health() {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 각 뉴스 항목의 데이터를 하드코딩된 형태로 사용
    const data = [
      { id: '5829', title: '노인 운동', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5829' },
      { id: '5252', title: '노인 고혈압', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5252' },
      { id: '5306', title: '노인 당뇨병', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5306' },
      { id: '5783', title: '노인 요실금', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5783' },
      { id: '5326', title: '노인 보행장애', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5326' },
      { id: '5253', title: '노인 호흡곤란', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5253' },
      { id: '5329', title: '노인 어지럼증', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5329' },
      { id: '5314', title: '노인 삼킴장애', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5314' },
      { id: '5428', title: '노인 약물복용', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5428' },
      { id: '5489', title: '노인성난청', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5489' },
      { id: '5345', title: '노인의 영양', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=5345' },
      { id: '2447', title: '노인 변비', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=2447' },
      { id: '6262', title: '노인 부종', url: 'http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=6262' },
    ];
    setNewsData(data);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/health/${id}`);
  };

   return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
        <Left />
      </div>
      <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
        <Right />
      </div>
      <div className="flex-1 ml-[20%] mr-[20%] p-10">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">아는 만큼 더 건강해집니다.</h2>
          <p className="mb-6 text-gray-700">카드를 누르시면 자세한 정보를 볼 수 있습니다.</p>
        </div>
        <div className="grid grid-cols-3 gap-10 p-10">
          {newsData.map(item => (
             <News
             key={item.id}
             title={item.title}
             id={item.id}
           />
         ))}
        </div>
      </div>
    </div>
  );
}