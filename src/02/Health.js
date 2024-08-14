import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js';
import Right from '../Compo/Right.js';
import News from './News.js';

export default function Health() {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); // 선택된 뉴스 상태
  const [animationState, setAnimationState] = useState(''); // 애니메이션 상태
  const [topButton, setTopButton] = useState(null); // 현재 맨 위에 있는 버튼 상태

  useEffect(() => {
    const loadNewsData = async () => {
      const data = [
        { id: '5252', title: '노인 고혈압' },
        { id: '5306', title: '노인 당뇨병' },
        { id: '5783', title: '노인 요실금' },
        { id: '5326', title: '노인 보행장애' },
        { id: '5253', title: '노인 호흡곤란' },
        { id: '5329', title: '노인 어지럼증' },
        { id: '5314', title: '노인 삼킴장애' },
        { id: '5428', title: '노인 약물복용' },
        { id: '5489', title: '노인성난청' },
        { id: '5345', title: '노인의 영양' },
        { id: '2447', title: '노인 변비' },
        { id: '5829', title: '노인 운동' },
      ];

      const fetchedData = await Promise.all(data.map(async (item) => {
        try {
          const response = await fetch(`/data/${item.id}.xml`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const xmlText = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");

          const svc = xmlDoc.getElementsByTagName("svc")[0];
          const content = svc.getElementsByTagName("cntntsCl")[0]?.getElementsByTagName("CNTNTS_CL_CN")[0]?.textContent || 'No content available';

          return { ...item, content };
        } catch (error) {
          console.error('Error fetching or parsing XML:', error);
          return { ...item, content: 'Error fetching content' };
        }
      }));

      setNewsData(fetchedData);
    };

    loadNewsData();
  }, []);

  const handleCardClick = (item) => {
    setSelectedNews(item);
    setAnimationState('fade-in');
  };

  useEffect(() => {
    if (selectedNews) {
      setAnimationState('fade-in');
      setTimeout(() => {
        setAnimationState('');
      }, 500);
    }
  }, [selectedNews]);

  const handleButtonClick = (id) => {
    setTopButton(id); // 클릭된 버튼의 id를 topButton 상태로 설정
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="fixed right-0 top-0 w-1/6 h-full z-10">
        <Right />
      </div>
      <div className="flex-1 ml-[15%] mr-[20%] p-10 z-0">
      <div className="font-bold mt-6" style={{ fontSize: '1.2rem' }}>
                  건강백과사전
        </div>
        <div className='mt-6 mb-5'>
          <h1 style={{ fontSize: '0.9rem' }}>- 자세한 정보를 보시려면 클릭하세요.</h1>
        </div>
        <div className="flex flex-wrap gap-8">
          {newsData.map(item => (
            <News
              key={item.id}
              title={item.title}
              id={item.id}
              onClick={() => handleCardClick(item)}
              isSelected={selectedNews?.id === item.id} // 선택 여부 전달
            />
          ))}
        </div>

        {/* 디테일 영역 */}
        {selectedNews && (
          <div className="flex mt-10">
            <div className="w-1/4 bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md">
              <h2 className=" font-bold mb-4 text-gray-800" style={{ fontSize: '1.0rem' }}>{selectedNews.title}</h2>
            </div>
            <div className={`w-3/4 transition-all duration-500 ease-in-out ${animationState}`}>
              <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <div className="border-b-2 border-gray-300 mb-6"></div>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '0.8rem' }}>{selectedNews.content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}