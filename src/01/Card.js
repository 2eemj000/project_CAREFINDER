
//TODO : props 제대로 받도록 정리

export default function Card({ title, content, onClick }) {
     return (
          <div
          onClick={onClick}
          className="cursor-pointer max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
          <h5 className="text-lg font-semibold mb-2">{title}</h5>
          <p className="text-sm text-gray-700">{content}</p>
          <div className="px-2 pt-2 pb-4 flex flex-wrap">
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">#간호등급</span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">#의료등급</span>
          </div>
      </div>

     )
}


