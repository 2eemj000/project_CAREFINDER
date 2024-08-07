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
        if (cardDetails && cardDetails.latitude && cardDetails.longitude) {
            const { kakao } = window; // Kakao Map API 객체

            // 지도 컨테이너
            const mapContainer = document.getElementById('map');
            // 지도 옵션
            const mapOption = {
                center: new kakao.maps.LatLng(cardDetails.latitude, cardDetails.longitude), // 중심 좌표
                level: 3 // 지도의 확대 레벨
            };

            // 지도 생성
            const map = new kakao.maps.Map(mapContainer, mapOption);

            // 마커 생성
            const markerPosition = new kakao.maps.LatLng(cardDetails.latitude, cardDetails.longitude);
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
        <div>
            <h1>{cardDetails.name}</h1>
            <p>{cardDetails.address}</p>
            <p>전화번호: {cardDetails.phone}</p>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}