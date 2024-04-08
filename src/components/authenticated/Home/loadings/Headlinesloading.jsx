import React from "react";

function Headlinesloading({count}) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
		{[...Array(count)].map((index)=>(
			<div key={index} className="block w-full p-3 animate-pulse">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-40 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full line-clamp-3"></div>
          <div className="mt-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
		))}
	</div>
  );
}

export default Headlinesloading;
