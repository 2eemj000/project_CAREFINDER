import { Link } from 'react-router-dom';

export default function News({ title, id }) {
  return (
    <Link to={`/health/${id}`} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </Link>
  );
}