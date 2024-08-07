import List from './List.js'
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Find() {
          const [selectedSpecialist, setSelectedSpecialist] = useState([]);
          const [selectedOther, setSelectedOther] = useState([]);
          const [region1, setRegion1] = useState('');
          const [region2, setRegion2] = useState('');
      
          const navigate = useNavigate();
      
          //prev 이때까지 선택된 거(현재상태) 에 확인해가며 넣기로.
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
          
          //TODO: 검색버튼, 누르면 파람스 전달하고/list 페이지로 네비게이트 되도록 함
          const handleSearch = () => {
            if (region1 && region2) {
                const queryParams = new URLSearchParams({
                    region1,
                    region2,
                    specialists: selectedSpecialist.length ? selectedSpecialist.join(',') : undefined,
                    others: selectedOther.length ? selectedOther.join(',') : undefined,
                }).toString();
                
                navigate(`/find/list?${queryParams}`); // 검색 후 리스트 화면으로 이동
            } else {
                alert('지역을 필수로 선택해야 합니다.');
            }
        };
      
          const handleReset = () => {
              setSelectedSpecialist([]);
              setSelectedOther([]);
              setRegion1('');
              setRegion2('');
          };
      
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
                          <div className="w-full max-w-3xl">
                              <h1 className="text-3xl font-bold mb-4">내 맘에 쏙 병원찾기</h1>
                              <p className="mb-6 text-gray-700">검색 조건을 선택하세요. 각 섹션에서 조건을 선택하면 해당 조건에 맞는 병원 목록이 나타납니다.</p>
                              
                              {/* 지역 섹션 */}
                              <div className="mb-6">
                                  <h2 className="text-xl font-semibold mb-2">지역</h2>
                                  <div className="flex space-x-4">
                                      <select
                                          value={region1}
                                          onChange={(e) => setRegion1(e.target.value)}
                                          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                                      >
                                          <option value="">지역 1 선택</option>
                                          <option value="region1">지역 1</option>
                                          <option value="region2">지역 2</option>
                                      </select>
                                      <select
                                          value={region2}
                                          onChange={(e) => setRegion2(e.target.value)}
                                          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                                      >
                                          <option value="">지역 2 선택</option>
                                          <option value="region1">지역 1</option>
                                          <option value="region2">지역 2</option>
                                      </select>
                                  </div>
                              </div>
      
                              {/* 전문의 */}
                              <div className="mb-6">
                                  <h2 className="text-xl font-semibold mb-2">전문의</h2>
                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                      {['전문의 1', '전문의 2', '전문의 3', '전문의 4', '전문의 5', '전문의 6', '전문의 7', '전문의 8', '전문의 9', '전문의 10'].map((item) => (
                                          <button
                                              key={item}
                                              onClick={() => handleSpecialistChange(item)}
                                              className={`px-4 py-2 border rounded-lg ${selectedSpecialist.includes(item) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                          >
                                              {item}
                                          </button>
                                      ))}
                                  </div>
                                  <p className="text-gray-700">선택된 전문의: {selectedSpecialist.join(', ')}</p>
                              </div>
      
                              {/* 기타인력 섹션 */}
                              <div className="mb-6">
                                  <h2 className="text-xl font-semibold mb-2">기타인력</h2>
                                  <div className="flex space-x-4 mb-4">
                                      {['기타인력 1', '기타인력 2', '기타인력 3', '기타인력 4'].map((item) => (
                                          <button
                                              key={item}
                                              onClick={() => handleOtherChange(item)}
                                              className={`px-4 py-2 border rounded-lg ${selectedOther.includes(item) ? 'bg-green-500 text-white' : 'bg-white text-green-500'}`}
                                          > {/* item 눌러지면 변경된색으로 계속 유지될 수 있도록 함 */}
                                              {item}
                                          </button>
                                      ))}
                                  </div>
                                  <p className="text-gray-700">선택된 기타인력: {selectedOther.join(', ')}</p>
                              </div>
      
                              {/* 검색과 초기화 버튼 */}
                              <div className="flex space-x-4">
                                  <button
                                      onClick={handleSearch}
                                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                  >
                                      검색
                                  </button>
                                  <button
                                      onClick={handleReset}
                                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                  >
                                      초기화
                                  </button>
                              </div>
                          </div>
                  </div>
              </div>
        );
      }
