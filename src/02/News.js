import { Link } from 'react-router-dom';

export default function News({ title, id, onClick, isSelected }) {
  return (
    <div
      className={`max-w-xs rounded-lg overflow-hidden shadow-lg transition-transform transform cursor-pointer ${
        isSelected ? 'scale-110 order-first' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      <div className="bg-gray-100 p-4 flex flex-col justify-center items-center h-full">
        <div>
          <div className="font-semibold text-gray-900" style={{ fontSize: '0.8rem' }}>{title}</div>
        </div>
      </div>
    </div>
  );
}