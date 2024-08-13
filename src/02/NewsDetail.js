import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Left from '../Compo/Left';
import Right from '../Compo/Right';

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const title = query.get('title') || 'No title available';
  const [newsItem, setNewsItem] = useState({ content: '' });

  useEffect(() => {
    const fetchNewsDetail = async () => {
      console.log('Fetching data for id:', id); // Debugging line
      try {
        const response = await fetch(`/data/${id}.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        // 상위 <svc> 요소 접근
        const svc = xmlDoc.getElementsByTagName("svc")[0];
        const content = svc.getElementsByTagName("cntntsCl")[0]?.getElementsByTagName("CNTNTS_CL_CN")[0]?.textContent || 'No content available';

        setNewsItem({ content });
      } catch (error) {
        console.error('Error fetching or parsing XML:', error);
        setNewsItem({ content: 'Error fetching content' });
      }
    };

    fetchNewsDetail();
  }, [id]);

  return (
    <div className="flex h-screen bg-white">
      <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
        <Left />
      </div>
      <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
        <Right />
      </div>
      <div className="flex-1 ml-[20%] mr-[20%] p-10">
        <div className="w-full max-w-3xl mx-auto bg-white p-8 border border-gray-300 mt-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
          <div className="border-b-2 border-gray-300 mb-6"></div>
          <p className="text-gray-700 leading-relaxed">{newsItem.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;