import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../common/config/firebase";
import { useDetails } from "../../../utils/context/MetaDetails";
import { useUserAuth } from "../../../utils/context/UserAuthContext";
import TopHeadlinesCard from "../cards/TopHeadlinesCard";
import HeadlinesLoading from "../loadings/Headlinesloading";

const Headlines = () => {
  const { user, setNews, News } = useUserAuth();
  const { country, setCountry, category, setCategory } = useDetails();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const setuserToken = () => {
    const token = user.accessToken;
    localStorage.setItem("token", token);
  };

  const getCategory = () => {
    if (user && user.uid) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setCategory(userData.category);
            });
          }
        })
        .catch((error) => console.error("Error fetching category:", error));
    }
  };

  const fetchNews = (countryCode, pageNumber) => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * category.length);
    const randomTag = category.length > 0 ? category[randomIndex] : "general";

    axios
      .get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${randomTag}&apiKey=3bfb0185171849269bf6697d52ecad67&pageSize=9&page=${pageNumber}&sortBy=publishedAt`)
      .then((response) => {
        setNews((prevNews) => [...prevNews, ...response.data.articles]);
      })
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  };

  const getLocationAndConvertToCountryCode = () => {
    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    getPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;

        const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0168c8e3915e4a0e994d1054c0a47ac8&language=en`;

        fetch(reverseGeocodeUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.results.length > 0) {
              const countryCode = data.results[0].components["ISO_3166-1_alpha-2"];
              setCountry(countryCode);
              getCategory();
              fetchNews(countryCode, page);
            } else {
              console.error("No country code found for the location.");
            }
          })
          .catch((error) => console.error("Error converting to country code:", error));
      })
      .catch((error) => console.error("Error getting location:", error));
  };

  const handleFetchMore = () => {
    const newPage = page + 1;
    fetchNews(country, newPage);
    setPage(newPage);
  };

  useEffect(() => {
    setuserToken();
    
  }, [user]);

  useEffect(() => {
    getLocationAndConvertToCountryCode();
    getCategory();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-gray-700 font-semibold text-start ms-5 my-8">
        Recent Updates
      </h1>
      {loading ? (
        <HeadlinesLoading count={News.length + 9} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {News && News.map((article, index) => (
            <TopHeadlinesCard key={index} article={article} />
          ))}
        </div>
      )}
      <div className="flex justify-center my-8">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={handleFetchMore}
        >
          Fetch More
        </button>
      </div>
    </div>
  );
};

export default Headlines;