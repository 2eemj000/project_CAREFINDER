import React from "react";
import Card from "./Card";

export default function List(){
     return (
          <div className="grid grid-cols-3 gap-4">
               <Card title="병원명 1" content="주소 1" />
               <Card title="병원명 2" content="주소 2" />
               <Card title="병원명 3" content="주소 3" />
               <Card title="병원명 4" content="주소 4" />
               <Card title="병원명 5" content="주소 5" />
               <Card title="병원명 6" content="주소 6" />
               <Card title="병원명 7" content="주소 7" />
               <Card title="병원명 8" content="주소 8" />
               <Card title="병원명 9" content="주소 9" />
          </div>
     )
}