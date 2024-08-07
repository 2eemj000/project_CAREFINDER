import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경

export default function List({ category }) {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate(); // useNavigate로 변경

    useEffect(() => {
        async function fetchCards() {
            try {
                const response = await fetch(`https://api.example.com/cards?category=${category}`);
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Failed to fetch cards', error);
            }
        }

        if (category) {
            fetchCards();
        }
    }, [category]);

    const handleCardClick = (cardId) => {
        navigate(`/find/card/${cardId}`); // useNavigate로 페이지 이동
    };

    return (
        <div>
            <div className="border-t border-gray-300 mt-6 pt-4 pb-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">안내사항</h2>
                <p className="text-gray-700">
                    여기에 안내사항을 적어주세요. 이 영역은 카드와는 별도로 배경색과 테두리를 가지고 있습니다.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        title={card.title}
                        content={card.content}
                        onClick={() => handleCardClick(card.id)} // 클릭 시 상세 페이지로 이동
                    />
                ))}
            </div>
        </div>
    );
}