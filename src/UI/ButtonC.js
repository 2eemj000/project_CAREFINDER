import {hover} from "@testing-library/user-event/dist/hover"

export default function ButtonC({caption, bcolor, handleClick}){
     const colorB={
          'orange' : 'bg-orange-500',
          'red' : 'bg-red-500',
          'green' : 'bg-green-300',
          'lime' : 'bg-lime-500',
          'sky' : 'bg-sky-500',
          'violet' : 'bg-violet-400',
          'teal' : 'bg-teal-400',

     }

     const colorBhover={
          'orange' : 'hover:bg-orange-800',
          'red' : 'hover:bg-red-800',
          'green' : 'hover:bg-green-800',
          'lime' : 'hover:bg-lime-800',
          'sky' : 'hover:bg-sky-800',
          'violet' : 'hover:bg-violet-800',
          'teal' : 'hover:bg-teal-700',
     }
     
     return (
          <button className={`flex-shrink-0 justify-center items-center 
               py-3 px-10 m-2
                text-white font-bold rounded-md
               ${colorB[bcolor]} ${colorBhover[bcolor]}`}
               onClick={handleClick}>
          {caption}
          </button>
     );
}