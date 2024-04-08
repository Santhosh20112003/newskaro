import React from "react";
import Headlines from "./Headlines";
import TrendingSources from "./TrendingSources";
import Footer from "../../../unauthenticated/components/Footer";

function Home() {
  return (
    <div className="">
      <div className="bg-gray-50 flex items-start w-full">
        <Headlines />
        <TrendingSources />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
