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
      const response = await axios.get("https://newsapi.org/v2/top-headlines/sources?apiKey=3bfb0185171849269bf6697d52ecad67");
      setSources(response.data.sources.slice(0, 10));
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
    <div className="w-full hidden  lg:block lg:w-1/2 xl:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md mt-3">
        <div className="p-4">
          <h1 className="text-lg lg:text-2xl text-gray-600 font-bold mb-2">
            Top Trending Sources
          </h1>

          {loading ? (
            <TrendingSourcesloading count={5} />
          ) : (
            sources.map((item, index) => (
              <Link to={item.url} key={item.id} className="bg-gray-100 p-3 mt-5 rounded-lg block hover:bg-gray-200 transition duration-300">
                <div className="flex items-end gap-2 mb-2">
                  <h1 className="text-orange font-bold text-3xl lg:text-4xl leading-none">{index + 1}</h1>
                  <p className="text-lg lg:text-xl font-semibold break-all capitalize">{item.name}</p>
                </div>
                <div className="text-base lg:text-lg break-words xl:text-xl font-serif line-clamp-2 font-thin">
                  {item.description}
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