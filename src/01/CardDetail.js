import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CardDetail() {
    const { cardId } = useParams();
    const [cardDetails, setCardDetails] = useState(null);

    
    useEffect(() => {
        async function fetchCardDetails() {
            try {
                const response = await fetch(`/api/cards/${cardId}`);
                const data = await response.json();
                setCardDetails(data);
            } catch (error) {
                console.error('Failed to fetch card details', error);
            }
        }

        fetchCardDetails();
    }, [cardId]);

    useEffect(() => {
        if (cardDetails && cardDetails.locx && cardDetails.locy) {
            const { kakao } = window; // Kakao Map API 객체

            // 지도 컨테이너
            const mapContainer = document.getElementById('map');
            // 지도 옵션
            const mapOption = {
                center: new kakao.maps.LatLng(cardDetails.locy, cardDetails.locx), // 위도, 경도
                level: 3 // 지도의 확대 레벨
            };

            // 지도 생성
            const map = new kakao.maps.Map(mapContainer, mapOption);

            // 마커 생성
            const markerPosition = new kakao.maps.LatLng(cardDetails.locy, cardDetails.locx); // 위도, 경도
            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);
        }
    }, [cardDetails]);

    if (!cardDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                <h1 style={{ fontSize: '24px', margin: '0' }}>{cardDetails.name}</h1>
                <p style={{ fontSize: '18px', margin: '0' }}>전화번호: {cardDetails.phone}</p>
            </div>
            <div style={{ borderBottom: '1px solid #ddd', margin: '20px 0', paddingBottom: '10px' }}>
                <h2>전문의 정보</h2>
                {/* 전문의 정보 추가 */}
                <p>{cardDetails.specialistInfo}</p>
            </div>
            <div>
                <h2>병원 위치</h2>
                <p>{cardDetails.address}</p>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
            </div>
        </div>
    );
}