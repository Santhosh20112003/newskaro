import React from "react";
import { Link } from "react-router-dom";
import { News_alt_img } from "../../../common/links";
import { ParseDate } from "../../../common/methods";

const TopHeadlinesCard = ({ article , index }) => {
  const { url, urlToImage, title, source, publishedAt, description,author } = article;

  return (
    <Link to={url} key={index} className="block w-full p-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {urlToImage && (
          <img
            src={urlToImage || `${News_alt_img}?`}
            alt={title}
            loading="lazy"
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            <strong>{author || source.name }</strong> - {ParseDate(publishedAt)}
          </p>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
          <div className="mt-4">
            <Link
              to={url}
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