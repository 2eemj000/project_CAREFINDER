
//TODO 1 : Card의 ()안에는 출력할 title, content 등의 내용을 params로 받아와야 함
export default function Card({ title, content }) {
     return (
     <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full h-40">
          <div className="p-5">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {content}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex flex-wrap">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#간호등급</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#의료등급</span>
          </div>
     </div>

     )
}


