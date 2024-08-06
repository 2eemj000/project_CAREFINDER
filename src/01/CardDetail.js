import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CardDetail() {
    const { cardId } = useParams(); // URL에서 카드 ID를 가져옴
    const [cardDetail, setCardDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCardDetail() {
            try {
                //const response = await fetch(여기에 {cardId} 담긴 페치 주소 들어가야함.);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardDetail(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        fetchCardDetail();
    }, [cardId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {cardDetail ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{cardDetail.title}</h1>
                    <p className="text-gray-700 mb-4">{cardDetail.content}</p>
                    <div className="flex flex-wrap">
                        {cardDetail.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </>
            ) : (
                <p>No details available</p>
            )}
        </div>
    );
}