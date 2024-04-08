import axios from "axios";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const [showLoadMore, setShowLoadMore] = useState(true);

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

  const fetchNews = () => {
    setLoading(true);
    axios
      .get(`https://ok.surf/api/v1/cors/news-feed`)
      .then((response) => {
        setNews(response.data.Business);
      })
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setuserToken();
  }, [user]);

  useEffect(() => {
    getCategory();
    fetchNews();
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (nextPage * 9 >= News.length) {
      setShowLoadMore(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-gray-700 font-semibold text-start ms-5 my-8">
        Recent Updates
      </h1>
      {loading ? (
        <HeadlinesLoading count={9} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {News && News.slice(0, page * 9).map((article, index) => (
            <TopHeadlinesCard key={index} article={article} />
          ))}
        </div>
      )}
      {showLoadMore && (
        <div className="flex justify-center my-8">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            onClick={handleShowMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Headlines;