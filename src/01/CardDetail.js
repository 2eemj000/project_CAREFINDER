import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Left from '../Compo/Left.js'

export default function CardDetail() {
    const { cardId } = useParams();
    const [cardDetails, setCardDetails] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false); //api를 두개 부르다보니, 동시에 부르면 충돌이 있어서 순서를 정해주기로 함

    useEffect(() => {
        async function fetchCardDetails() {
            try {
                const response = await fetch(`http://localhost:8080/find/card/${cardId}`);
                const data = await response.json();
                setCardDetails(data["1"][0]);
            } catch (error) {
                console.error('Failed to fetch card details', error);
            }
        }

        fetchCardDetails();
    }, [cardId]);

    useEffect(() => {
        if (cardDetails && cardDetails.locx && cardDetails.locy) {
            const initializeMap = () => {
                const { kakao } = window; //window 객체로 만들어 줘야 쓸수있음

                if (kakao && kakao.maps) {
                    try {
                        const mapContainer = document.getElementById('map');
                        const mapOption = {
                            center: new kakao.maps.LatLng(cardDetails.locy, cardDetails.locx),
                            level: 3
                        };

                        const map = new kakao.maps.Map(mapContainer, mapOption);

                        const markerPosition = new kakao.maps.LatLng(cardDetails.locy, cardDetails.locx);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition
                        });
                        marker.setMap(map);

                    } catch (error) {
                        console.error("Error initializing Kakao Map: ", error);
                    }
                } else {
                    console.error("Kakao Maps API is not available.");
                }
            };

            // 맵 초기화
            initializeMap();
        }
    }, [cardDetails]);

    if (!cardDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed left-0 top-0 w-1/6 h-full z-10">
                <Left />
            </div>

            <div className="flex-1 ml-[15%] mr-[20%] p-10 z-0">
                <div style={{ padding: '20px', fontFamily: 'Roboto, sans-serif', color: '#333' }}>
                    <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '25px', marginBottom: '20px' }}>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{cardDetails.name}</h1>
                        <p className="text-lg text-gray-600 flex items-center">
                            <i className="fa fa-phone mr-2 text-blue-500"></i>
                            {cardDetails.phone}
                        </p>
                    </div>
                    <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '30px', paddingBottom: '30px' }}>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">전문의 진료과목</h2>
                        {cardDetails.specialistInfo.split(' ').map((info, index) => (
                            <span key={index} className="bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm font-medium">
                                {info}
                            </span>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">병원 위치 및 주소</h2>
                        <p className="text-base text-gray-600 mb-4">{cardDetails.address}</p>                        <div id="map" style={{ width: '100%', height: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}