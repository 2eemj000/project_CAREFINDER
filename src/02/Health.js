import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from '../Compo/Left.js';
import Right from '../Compo/Right.js';
import News from './News.js';

export default function Health() {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  //여기 fetch는 json 제공 안하고 xml이라서 파싱해서 사용해야함
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=YOUR_SERVICE_KEY');
        const xmlData = await response.text();

        // XML 데이터 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const items = xmlDoc.getElementsByTagName('cntntsCl');

        const filteredData = Array.from(items)
          .map(item => {
            const title = item.getElementsByTagName('CNTNTSSJ')[0].textContent;
            const content = item.getElementsByTagName('CNTNTS_CL_CN')[0].textContent;
            return { title, content };
          })
          .filter(item => item.title.includes('노인')); // '노인'이 포함된 항목만 필터링

        setNewsData(filteredData);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

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
        <div className="grid grid-cols-3 gap-10">
          {newsData.map((item, index) => (
            <News key={index}
              detail={item}
              onClick={() => navigate(`/news/${item.title}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}