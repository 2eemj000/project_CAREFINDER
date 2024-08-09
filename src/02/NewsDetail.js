import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Left from '../Compo/Left';
import Right from '../Compo/Right';

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    console.log('Fetched newsId:', newsId); // Debugging line to check newsId

    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=1910d1a09405&cntntsSn=${newsId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlData = await response.text();

        // XML 데이터 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const cntnts = xmlDoc.getElementsByTagName('cntntsCl')[0];

        if (cntnts) {
          setNewsDetail({
            title: cntnts.getElementsByTagName('CNTNTSSJ')[0].textContent.trim(),
            content: cntnts.getElementsByTagName('CNTNTS_CL_CN')[0].textContent.trim(),
          });
        } else {
          console.error('No content found in the response');
        }
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchNewsDetail();
  }, [newsId]);

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
          {newsDetail ? (
            <>
              <h2 className="text-3xl font-bold mb-4">{newsDetail.title}</h2>
              <p className="text-gray-700">{newsDetail.content}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;