import React from 'react'

export default function News({ detail, onClick }) {
     return (
       <div onClick={onClick} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
         <img src="https://source.unsplash.com/featured/?nature,forest" alt="Random Nature or Forest Image" />
         <div className="px-6 py-4">
           <div className="font-bold text-xl mb-2">{detail.title}</div>
           <p className="text-gray-700 text-base">
             {detail.content}
           </p>
         </div>
       </div>
     );
   }