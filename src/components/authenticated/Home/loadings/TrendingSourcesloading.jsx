import React from "react";

function TrendingSourcesloading({ count }) {
  return (
    <div className="">
      {[...Array(count)].map((index) => (
        <div key={index} className="bg-gray-100 p-3 mt-5 rounded-lg w-full block animate-pulse">
          <div className="flex items-end gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded mt-2 w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

export default TrendingSourcesloading;
