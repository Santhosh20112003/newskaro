import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../utils/context/UserAuthContext";

const NewsFeeds = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useUserAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ok.surf/api/v1/cors/news-feed`,{
        headers: { accept: "application/json" },
      })
      .then((result) => {
        setNews(result.data.Business);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching the news.");
        setNews([]);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <section className="text-gray-600">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full md:mb-20 mb-10">
          <h1 className="md:text-5xl text-4xl font-semibold title-font mb-4 text-gray-900">
           Trending News
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
		  Data fetched from the trending news on TechCrunch - APIs curated by Santech API and recommended based on functionality offered, performance, and support!
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <svg className="animate-spin w-12 text-emerald-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-full md:w-5/6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.slice(0, 6).map((api) => (
                <Link to={api.link} key={api.title} className="p-4 shadow-lg bg-gray-50 rounded-lg">
                  <div className="h-full flex flex-col items-center text-center">
                    <img
                      alt={api.title}
                      className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                      src={api.og}
                    />
                    <div className="w-full">
                      <h2 className="title-font font-semibold text-lg text-gray-900">
                        {api.source}
                      </h2>
                      <p className="mb-4">{api.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center pt-10">
          <Link to={user ? "/dashboard" : "/login"} className="py-2 inline-flex items-center px-5 shadow-lg bg-emerald-500 text-white text-xl rounded-full active:scale-95 transition-all">
            See More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsFeeds;