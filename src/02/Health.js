import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js';
import News from './News.js';
import Footer from '../Compo/Footer.js';

export default function Health() {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); // 선택된 뉴스 상태
  const [animationState, setAnimationState] = useState(''); // 애니메이션 상태
  const [topButton, setTopButton] = useState(null); // 현재 맨 위에 있는 버튼 상태

  useEffect(() => {
    fetch('/dictionary.json')
      .then(response => response.json())
      .then(data => setNewsData(data))
      .catch(error => console.error('Error fetching JSON:', error));
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
    <div className="flex flex-col h-screen">
      <div className="fixed left-0 top-0 w-1/6 h-full z-10">
        <Left />
      </div>
      <div className="flex-1 ml-[15%] mr-[10%] p-10 z-0">
        <div className="font-bold mt-6" style={{ fontSize: '1.2rem' }}>
          건강백과사전
        </div>
        <div className='mt-6 mb-5'>
          <h1 style={{ fontSize: '0.9rem' }}>- 아는 만큼 건강해집니다! 자세한 정보를 보시려면 클릭하세요.</h1>
        </div>
        <div className="flex flex-wrap gap-8">
          {newsData.map(item => (
            <News
              key={item.ID}
              title={item.title}
              id={item.ID}
              onClick={() => handleCardClick(item)}
              isSelected={selectedNews?.id === item.id} // 선택 여부 전달
            />
          ))}
        </div>

        {/* 디테일 영역 */}
        {selectedNews && (
          <div className="mt-10">
            <div className="flex mb-6">
              <div className="w-1/6 p-4 border border-gray-300 rounded-lg shadow-md flex items-center justify-center"
               style={{ backgroundColor: 'rgb(146, 198, 232)' }}>
                <div className="text-center">
                  <h2 className="font-bold mb-4 text-gray-800" style={{ fontSize: '1.0rem' }}>
                    {selectedNews.title}
                  </h2>
                </div>
              </div>
              <div className={`w-5/6 transition-all duration-500 ease-in-out ${animationState}`}>
                <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                  <div className="border-b-2 border-gray-300 mb-6"></div>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: '0.8rem' }}>
                    {selectedNews.content}
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 카드 */}
            <div className="flex">
              <div className="w-1/6 bg-gray-400 p-4 border border-gray-300 rounded-lg shadow-md flex items-center justify-center"
               style={{ backgroundColor: 'rgb(98, 173, 222)' }}>
                <div className="text-center">
                  <h2 className="font-bold mb-4 text-gray-800" style={{ fontSize: '1.0rem' }}>
                    진단 및 검사
                  </h2>
                </div>
              </div>
              <div className={`w-5/6 transition-all duration-500 ease-in-out ${animationState}`}>
                <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                  <div className="border-b-2 border-gray-300 mb-6"></div>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: '0.8rem' }}>
                    {selectedNews.check}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}