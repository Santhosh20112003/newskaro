
import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../../utils/context/UserAuthContext";
import { profile_banner } from "../../../common/links";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../common/config/firebase";

const availableCategories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function Profile() {
  const { user } = useUserAuth();
  const [userCategories, setUserCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUserCategories(userData.category || []);
          });
        }
      }
    };

    fetchData();
  }, [user]);

  const handleUpdateCategories = async () => {
    const uniqueCategories = Array.from(
      new Set([...userCategories, ...selectedCategories])
    );

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { category: uniqueCategories });
      setUserCategories(uniqueCategories);
    } catch (error) {
      console.error("Error updating user data: ", error);
    }

    setSelectedCategories(new Set());
    setEditing(false);
  };

  const handleAddCategory = (category) => {
    const updatedCategories = new Set(selectedCategories);
    updatedCategories.add(category);
    setSelectedCategories(updatedCategories);
  };

  const handleRemoveSelectedCategory = (category) => {
    const updatedCategories = new Set(selectedCategories);
    updatedCategories.delete(category);
    setSelectedCategories(updatedCategories);
  };



  const handleRemoveCategory = async (category) => {
    const updatedCategories = userCategories.filter((cat) => cat !== category);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { category: updatedCategories });
      setUserCategories(updatedCategories);
    } catch (error) {
      console.error("Error removing category: ", error);
    }
  };

  return (
    <div className="w-full lg:p-5 flex flex-col items-center justify-center">
      <div className="w-full bg-white lg:shadow-lg rounded-lg p-4 mx-5 h-[85vh] md:h-full overflow-x-hidden">
        <div className="relative flex justify-center min-h-[200px] md:min-h-[250px] md:h-[250px] bg-cover rounded-xl">
          <img src={profile_banner} className="absolute h-full w-full object-cover rounded-xl brightness-75 bg-gray-300" alt="" />
          <div className="absolute -bottom-12 md:-bottom-13 md:left-5 flex items-center justify-center h-24 w-24 rounded-full border-4 border-white bg-blue-500">
            <h1 className=" -mt-5 text-7xl text-white">{user.email && user.email.slice(0, 1)}</h1>
          </div>
        </div>

        <div className="mt-14 md:ml-10 md:w-full flex flex-col items-center md:items-start">
          <h4 className="text-xl font-bold text-navy-700 break-all hidden md:inline-flex items-center">
            {user.uid} <span className="bg-gray-200 ml-2 px-2 py-1 text-sm rounded-xl text-gray-500">userid</span>
          </h4>
          <h4 className="text-xl font-bold text-navy-700 text-center break-all md:hidden mt-3">{user.uid}</h4>
          <p className="text-lg font-normal text-gray-600 break-all mt-1 lg:ms-2">{user.email}</p>

          <div className="mt-8">
            <span className="inline-flex items-center justify-center gap-5">
              <h2 className="text-2xl font-bold text-navy-700">User Categories:</h2>
              <button onClick={() => setEditing(true)} className="text-gray-500">
                <i className="fas fa-pen-nib"></i>
              </button>
            </span>
            <ul className="text-lg my-5 px-5 font-normal flex flex-wrap gap-3 max-w-full text-gray-600">
              {userCategories.map((category, index) => (
                <li key={index} className="bg-gray-500 text-white rounded-full text-center py-2 px-4">{category}</li>
              ))}
            </ul>
          </div>

          {editing && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Select Categories to Add/Remove</h2>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button className={`px-3 py-1 rounded ${userCategories.includes(category) || selectedCategories.has(category) ? "bg-emerald-500 text-white" : "bg-gray-200"}`} onClick={() => selectedCategories.has(category) ? handleRemoveSelectedCategory(category) : handleAddCategory(category)}>
                        {category}
                      </button>
                      {userCategories.includes(category) && (
                        <button className="ml-2 text-red-500" onClick={() => handleRemoveCategory(category)}>
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <span className="flex items-center justify-between">
                <button onClick={handleUpdateCategories} className="mt-4 px-3 py-1 bg-gray-700 text-white rounded">Update Categories</button>
                <button onClick={()=>{setEditing(false)}} className="mt-4 px-3 py-1 bg-red-700 text-white rounded">Cancel</button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;