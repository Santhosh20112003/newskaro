import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrendingSourcesloading from "../loadings/TrendingSourcesloading";

function TrendingSources() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://ok.surf/api/v1/cors/news-feed");
      setSources(response.data.Business.filter((item, index, self) =>
      index === self.findIndex((t) => t.source === item.source)
    ).slice(0, 15));
    } catch (err) {
      console.log("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full lg:block lg:w-1/2 xl:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md mt-3">
        <div className="p-4">
          <h1 className="text-lg lg:text-2xl text-gray-600 font-bold mb-2">
            Top Trending Sources
          </h1>

          {loading ? (
            <TrendingSourcesloading count={5} />
          ) : (
            sources.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className="bg-gray-100 p-3 mt-5 rounded-lg block hover:bg-gray-200 transition duration-300"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.source_icon}
                    alt={item.title}
                    className="w-5 h-5 rounded-full"
                  />
                  <p className="text-lg lg:text-xl font-semibold break-all capitalize">
                    {item.source}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TrendingSources;