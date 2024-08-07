import Home from './01/Home.js';
import skyImage from './Img/Sky.jpg';
import logoImage from './Img/Logo.png';
import ButtonC from './UI/ButtonC.js';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Find from './01/Find.js';
import List from './01/Find.js';
import CardDetail from './01/CardDetail.js'; 
import Health from './02/Health.js'; 
import Community from './03/Community.js'; 
import ComWrite from './03/ComWrite.js';
import Qna from './04/Qna.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/find/search" element={<Find />} />
        <Route path="/find/list" element={<List />} />
        <Route path="/find/card/:cardId" element={<CardDetail />} />
        <Route path="/health" element={<Health />} />
        <Route path="/community" element={<Community />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/community/write" element={<ComWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp() {
  const navigate = useNavigate();

  return (
      <div className="flex flex-col w-full h-screen max-w-screen-lg overflow-y-auto mx-auto">
        <header className='flex justify-center items-center flex-col'>
          <div className='logo-wrapper'>
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>
          <div className='image-wrapper'>
            <img src={skyImage} alt="Sky" className="background-image" />
            <div className="text-overlay large-text">
              오래 살수록 인생은 더 아름다워진다.
            </div>
            <div className="text-overlay medium-text font-mono">
              "The longer I live, the more beautiful life becomes."
            </div>
            <div className="text-overlay small-text font-mono">
              -Frank Lloyd Wright-
            </div>
          </div>
        </header>
        <main className='grow flex justify-center items-center'>
          <ButtonC bcolor="sky" 
                  title='요양 병원 찾기' 
                  text='내가 원하는 전문의가 있는 병원을 찾아보세요.' 
                  handleClick={() => navigate('/find')}/>
          <ButtonC bcolor="purple" 
                  title='건강백과사전'
                  text='아는 만큼 건강해집니다.'
                  handleClick={() => navigate('/health')}/>
          <ButtonC bcolor="blue" 
                  title='커뮤니티' 
                  text='너두 아파? 나두 아파! 함께 이야기 나눠요.' 
                  handleClick={() => navigate('/community')}/>
          <ButtonC bcolor="teal" 
                  title='Q&A' 
                  text='궁금증 해소하고 한 살 젊어져요.'
                  handleClick={() => navigate('/qna')}/>
        </main>
        <footer className='w-full flex justify-center items-center h-20 bg-slate-500 text-purple-50 font-mono'>
          ⓒ 2024 CAREFINDER, All rights reserved.
        </footer>
      </div>
  );
}

export default App;