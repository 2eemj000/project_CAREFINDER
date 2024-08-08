import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NewsDetail() {
    const { newsId } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=YOUR_TOKEN&cntntsSn=${newsId}`);
                const xmlData = await response.text(); // XML로 처리
                
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
                
                const contentTitle = xmlDoc.getElementsByTagName('CNTNTSSJ')[0]?.textContent || 'No Title';
                const contentDescription = xmlDoc.getElementsByTagName('CNTNTS_CL_CN')[0]?.textContent || 'No Description';
                
                setNewsDetail({ title: contentTitle, description: contentDescription });
            } catch (error) {
                console.error('Error fetching news details:', error);
            }
        };

        fetchData();
    }, [newsId]);

    if (!newsDetail) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h1>{newsDetail.title}</h1>
            <p>{newsDetail.description}</p>
        </div>
    );
}

export default NewsDetail;