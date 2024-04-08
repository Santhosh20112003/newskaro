import React from "react";
import Bannar from "./Bannar";
import Contact from "./Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import NewsFeeds from "./NewsFeeds";
import Testimonials from "./Testimonials";

function Home() {
  return (
    <div>
      <Bannar />
      <Navbar />
      <Hero />
      <NewsFeeds />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
