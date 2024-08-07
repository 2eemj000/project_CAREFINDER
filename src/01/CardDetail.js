import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CardDetail() {
    const { cardId } = useParams();
    const [ cardDetails, setCardDetails] = useState(null);
    //카드 상세 정보를 딕셔너리처럼 다 가지고 있는 객체임

    useEffect(() => {
        async function fetchCardDetail() {
            try {
                const response = await fetch(`주소/card/{cardId}`);
                const data = await response.json();
                setCardDetails(data);
            } catch(error){
                console.error('패치 실패', error);
            }
        }

            fetchCardDetail();
    }, [cardId]);

    const { name, phone, specialists, others, address, latitude, longitude } = hospitalDetails;

    return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p className="text-lg mb-2">전화번호: {phone}</p>

            <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="text-xl font-semibold mb-2">전문의</h3>
                <div className="flex flex-wrap mb-4">
                    {specialists.map((spec, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            #{spec}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="text-xl font-semibold mb-2">기타 인력</h3>
                <div className="flex flex-wrap mb-4">
                    {others.map((other, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            #{other}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="text-xl font-semibold mb-2">주소</h3>
                <p className="text-lg mb-2">{address}</p>

                <div className="w-full h-64">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="map"
                        src={`https://maps.kakao.com/?q=${latitude},${longitude}`}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}