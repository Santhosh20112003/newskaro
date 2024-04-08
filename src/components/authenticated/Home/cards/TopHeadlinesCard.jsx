import React from "react";
import { Link } from "react-router-dom";
import { News_alt_img } from "../../../common/links";
import { ParseDate } from "../../../common/methods";

const TopHeadlinesCard = ({ article, index }) => {
  return (
    <Link to={article.link} key={index} className="block w-full p-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {article.og && (
          <img
            src={article.og || `${News_alt_img}?`}
            alt={article.title}
            loading="lazy"
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <span className="inline-flex items-center gap-3">
            <img
              src={article.source_icon}
              alt={article.title}
              className="w-5 h-5 rounded-full"
            />
            <h2 className="text-lg font-semibold ">{article.source}</h2>
          </span>
          <p className="text-sm text-gray-600 mb-2">
            <strong>{article.title}</strong>
          </p>
          <div className="mt-4">
            <Link
              to={article.link}
              className="text-emerald-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopHeadlinesCard;
