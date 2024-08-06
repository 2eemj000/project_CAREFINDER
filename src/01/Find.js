import React from 'react'
import List from './List.js'
import Left from '../Compo/Left.js'
import Right from '../Compo/Right.js'

export default function Find() {
     return (
          <div className="flex h-screen">
            {/* 왼쪽 고정 */}
            <div className="fixed left-0 top-0 w-1/5 h-full bg-gray-200">
              <Left />
            </div>
      
            {/* 오른쪽 고정 */}
            <div className="fixed right-0 top-0 w-1/5 h-full bg-gray-200">
              <Right />
            </div>
      
            {/* 중앙 콘텐츠 */}
            <div className="flex-1 ml-[20%] mr-[20%] p-4">
              <List />
            </div>
          </div>
        );
      }
