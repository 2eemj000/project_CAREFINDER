import React, { useEffect, useState } from 'react';
import Card from './Card';
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
import { useNavigate, useLocation } from 'react-router-dom';

export default function List() {
    const [cards, setCards] = useState([]);
    const location = useLocation(); // 현재 위치 정보 가져오기
    const navigate = useNavigate();

    // api 연결용! 테스트 후 펫치 실행하면 됨
    // // async function fetchCards() {
    // //const queryParams = new URLSearchParams(location.search);
    // //const sido = queryParams.get('sido');
    // const sigungu = queryParams.get('sigungu');

    //     // 선택적 파라미터 추출
    //     const doctor = queryParams.get('doctor');
    //     const person = queryParams.get('person');

    //     // 필수 파라미터가 없으면 요청하지 않음
    //     if (!sido || !sigungu) {
    //         console.error('필수 파라미터(sido, sigungu)가 누락되었습니다.');
    //         return;
    //     }

    //     // 선택적 파라미터가 있는 경우만 추가
    //     let url = `http://localhost:8080/find/list?sido=${sido}&sigungu=${sigungu}`;
    //     if (doctor) url += `&doctor=${doctor}`;
    //     if (person) url += `&person=${person}`;

    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setCards(data);
    //     } catch (error) {
    //         console.error('Failed to fetch cards', error);
    //     }} //함수이므로 useEffect 밖에 있어야 함, 실체 페치 될때 살리면 됨

    // 테스트용
    async function fetchCards() {
        try {
            const data = [
                { id: '1', name: '아프면병원', phone: '010-1234-5678', level: '1' },
                { id: '2', name: '앓아도병원', phone: '010-2345-6789', level: '2' },
                { id: '3', name: '가야지', phone: '010-3456-7890', level: '3' },
            ];
            setCards(data);
        } catch (error) {
            console.error('Failed to fetch cards', error);
        }
    }

    useEffect(() => {
        fetchCards(); // 실제 API 호출 대신 임의 데이터 사용
    }, [location.search]);

    const handleCardClick = (cardId) => {
        navigate(`/find/card/${cardId}`); // useNavigate로 페이지 이동
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200 z-10">
                <Left />
            </div>
            <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200 z-10">
                <Right />
            </div>
            <div className="flex-1 ml-[20%] mr-[20%] p-10 z-0 bg-gray-50">
                <div className="border-t border-gray-300 mt-6 pt-4 pb-6 mb-8">
                    <h2 className="text-xl font-semibold mb-2">병원 목록</h2>
                    <p className="text-gray-700">
                        사용자 선택에 따른 병원이 출력됩니다. 
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            name={card.name}
                            phone={card.phone}
                            onClick={() => handleCardClick(card.id)} // 클릭 시 상세 페이지로 이동
                            level={card.level} // levels 데이터를 전달
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}