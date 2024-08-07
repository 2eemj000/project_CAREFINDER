import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate, useLocation } from 'react-router-dom'; 

export default function List({ category }) {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate(); 
    const location = useLocation();
    //TODO: useLocation을 사용하면 쿼리파라미터 읽고 api 호출할수있다함 시도해보는거임
    //근데 api를 확실히 모르겠다 보니 파람스 저렇게 읽어와도 되는지 모르겠네...

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const region1 = queryParams.get('region1');
        const region2 = queryParams.get('region2');
        const specialists = queryParams.get('specialists')?.split(',') || [];
        const others = queryParams.get('others')?.split(',') || [];


        async function fetchCards() {
            try {
                const response = await fetch(`https:어쩌구?region1=${region1}&region2=${region2}&specialists=${specialists.join(',')}&others=${others.join(',')}`);
                const tdata = await response.json();
                setCards(tdata);
            } catch (error) {
                console.error('패치 실패', error);
            }
        }

        fetchCards();
    }, [location.search]);

    //카드 클릭 시 id 넘겨주고 해당 카드의 상세페이지로 이동
    const handleCardClick = (cardId) => { 
        navigate(`/find/card/${cardId}`);
    };

    return (
        <div>
            <div className="border-t border-gray-300 mt-6 pt-4 pb-6 mb-8">
                <h2 className="text-xl font-semibold mb-2">안내사항</h2>
                <p className="text-gray-700">
                    병원 누르시면 자세한 정보 볼수있어욥
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