import { Link } from 'react-router-dom';

export default function News({ title, id }) {
  return (
    <Link 
      to={`/health/${id}?title=${encodeURIComponent(title)}`} 
      className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="bg-blue-100 p-6 flex flex-col justify-between h-full">
        <div>
          <div className="font-semibold text-2xl mb-2 text-gray-900">{title}</div>
        </div>
        <div className="mt-4 flex items-center justify-between text-gray-500 text-xs">
          <span>더보기</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l7-7 7 7-7 7-7-7z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}