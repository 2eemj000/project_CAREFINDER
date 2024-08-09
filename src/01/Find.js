import List from './List.js'
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import image1 from '../Img/medicine.png';
import image2 from '../Img/wound.png';
import image3 from '../Img/knee.png';
import image4 from '../Img/hand.png';
import image5 from '../Img/mental.png';
import image6 from '../Img/osteopathy.png';
import image7 from '../Img/han.png';
import image8 from '../Img/kit.png';
import image9 from '../Img/skin.png';
import image10 from '../Img/ear.png';

export default function Find() {
    const [selectedSpecialist, setSelectedSpecialist] = useState([]);
    const [selectedOther, setSelectedOther] = useState([]);
    const [region1, setRegion1] = useState('');
    const [region2, setRegion2] = useState('');
    const [regions, setRegions] = useState([]); //region1을 저장할 변수
    const [subregions, setSubregions] = useState({});
    const navigate = useNavigate();

    const images = [
        image1, image2, image3, image4, image5,
        image6, image7, image8, image9, image10
    ];

    const specialists = ['내과', '외과', '정형외과', '신경과', '정신건강의학과', '재활의학과', '한방내과', '가정의학과', '피부과', '이비인후과'];
    const otherOptions = ['물리치료사', '작업치료사', '사회복지사', '약사'];

    // prev 이때까지 선택된 거(현재상태) 에 확인해가며 넣기로.
    const handleSpecialistChange = (value) => {
        setSelectedSpecialist(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleOtherChange = (value) => {
        setSelectedOther(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    // TODO: 검색버튼, 누르면 파람스 전달하고 /list 페이지로 네비게이트 되도록 함
    const handleSearch = () => {
        if (region1 && region2) {
            const queryParams = new URLSearchParams({
                sido: region1,
                sigungu: region2,
                doctor: selectedSpecialist.join(','), // 선택된 전문의를 콤마로 구분
                person: selectedOther.join(',') // 선택된 기타인력을 콤마로 구분
            }).toString();

            navigate(`/find/list?${queryParams}`); // 검색 후 리스트 화면으로 이동
        } else {
            alert('지역은 필수로 선택해야 합니다.');
        }
    };

    const handleReset = () => {
        setSelectedSpecialist([]);
        setSelectedOther([]);
        setRegion1('');
        setRegion2('');
    };

       // 서버에서 지역 데이터 가져오기
       useEffect(() => {
        fetch('http://localhost:8080/find/regions')
            .then(response => response.json())
            .then(data => {
                // 중복 제거
                const uniqueRegions = [...new Set(data.map(region => region.code))];
                const uniqueRegionData = data.filter((region, index, self) =>
                    index === self.findIndex(r => r.code === region.code)
                );
                setRegions(uniqueRegionData);
            })
            .catch(error => console.error('Error fetching regions:', error));
    }, []);

    // 첫 번째 지역 선택 시 하위 지역 데이터 가져오기
    useEffect(() => {
        if (region1) {
            fetch(`http://localhost:8080/find/subregions?region1=${region1}`)
                .then(response => response.json())
                .then(data => {
                    // 하위 지역 데이터 중복 제거
                    const uniqueSubregions = data.filter((subregion, index, self) =>
                        index === self.findIndex(r => r.code === subregion.code)
                    );
                    setSubregions(prev => ({ ...prev, [region1]: uniqueSubregions }));
                })
                .catch(error => console.error('Error fetching subregions:', error));
        } else {
            setSubregions({});
        }
        setRegion2('');
    }, [region1]);

    return (
        <div className="flex h-screen">
            <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
                <Left />
            </div>
            <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
                <Right />
            </div>

            {/* 메인부분 */}
            <div className="flex-1 ml-[20%] mr-[20%] p-10">
                <div className="font-bold text-2xl mt-6">
                    내 맘에 쏙 병원찾기
                </div>
                <div className='mt-6'>
                    <h1>- 검색 조건을 선택하세요.</h1>
                    <h1>- 각 섹션에서 조건을 선택하면 해당 조건에 맞는 병원 목록이 나타납니다.</h1>
                </div>
                <div>
                    {/* 지역 섹션 */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 mt-10">지역</h2>
                        <div className="flex space-x-4">
                            <select
                                value={region1}
                                onChange={(e) => setRegion1(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                            >
                                <option value="">시/도 선택</option>
                                {regions.map(region => (
                                    <option key={region.code} value={region.code}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={region2}
                                onChange={(e) => setRegion2(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                            >
                                <option value="">시/군/구 선택</option>
                                {region1 && subregions[region1] && subregions[region1].map(subregion => (
                                    <option key={subregion.code} value={subregion.code}>
                                        {subregion.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 전문의 섹션 */}
                    <div className="mb-10 relative" style={{ zIndex: 0 }}>
                        <h2 className="text-xl font-semibold mb-2">전문의</h2>
                        <div className="flex justify-center relative">
                            <div className="grid grid-cols-5 gap-8 mb-5 max-w-screen-xl px-4">
                                {specialists.map((item, index) => (
                                    <button
                                        key={item}
                                        onClick={() => handleSpecialistChange(item)}
                                        className={`w-full aspect-square border rounded-lg flex flex-col items-center justify-center ${selectedSpecialist.includes(item) ? 'bg-blue-200 text-white font-bold' : 'bg-white text-blue-500'} transition-transform transform hover:scale-105`}
                                        style={{
                                            width: "140px", // 버튼 너비
                                            minHeight: "140px", // 버튼 높이
                                            padding: "2px", // 버튼 안쪽 여백
                                            position: 'relative', // position 설정
                                            zIndex: 1, // z-index 설정
                                        }}
                                    >
                                        <img
                                            src={images[index % images.length]} // 이미지 배열 순환 사용
                                            alt={item}
                                            className="w-16 h-16 object-contain mb-4"
                                        />
                                        <span className="text-black">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700 mt-2">선택된 전문의: {selectedSpecialist.join(', ')}</p>
                    </div>

                    {/* 기타인력 섹션 */}
                    <div className="mb-10 relative" style={{ zIndex: 0 }}>
                        <h2 className="text-xl font-semibold mb-2">기타인력</h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-4 relative">
                            {otherOptions.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleOtherChange(item)}
                                    className={`flex items-center justify-center border rounded-lg ${selectedOther.includes(item) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} transition-transform transform hover:scale-105`}
                                    style={{
                                        width: '150px',
                                        height: '50px',
                                        position: 'relative', // position 설정
                                        zIndex: 1, // z-index 설정
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <p className="text-gray-700">선택된 기타인력: {selectedOther.join(', ')}</p>
                    </div>

                    {/* 검색과 초기화 버튼 */}
                    <div className="flex space-x-4 pb-20">
                        <button
                            onClick={handleSearch}
                            className="flex-1 bg-blue-500 text-white font-bold px-4 py-2 rounded-lg"
                            style={{ borderRadius: '20px' }}
                        >
                            검색
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gray-500 text-white font-bold px-4 py-2 rounded-lg"
                            style={{ borderRadius: '20px' }}
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}