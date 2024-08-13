import { Link } from 'react-router-dom';

export default function News({ title, id, onClick }) {
  return (
    <div 
      className="max-w-xs rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-blue-100 p-4 flex flex-col justify-center items-center h-full">
        <div>
          <div className="font-semibold text-l text-gray-900">{title}</div>
        </div>
      </div>
    </div>
  );
}