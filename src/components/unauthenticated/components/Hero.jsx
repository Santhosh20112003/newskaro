import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="text-gray-600 body-font">
      <div className="w-full h-[80vh] mx-auto flex lg:px-24 px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 mt-10 md:mt-0 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 leading-tight">Stay Updated with the Latest News
            <br className="hidden lg:inline-block"/>from Around the World
          </h1>
          <p className="mb-8 leading-relaxed">Discover top stories, breaking news, and in-depth coverage on a wide range of topics. Whether it's technology, business, sports, or entertainment, we've got you covered.</p>
          <div className="flex justify-center">
            <Link to="/login" className="inline-flex text-white bg-emerald-500 border-0 py-2 px-6 active:scale-95 transition-all focus:outline-none hover:bg-emerald-600 rounded text-lg mr-4">Explore Now</Link>
          </div>
        </div>
        <div className="lg:max-w-lg hidden md:block lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded-lg" alt="hero" src="https://ik.imagekit.io/vituepzjm/Newsletter-cuate.svg?updatedAt=1712478497894"/>
        </div>
      </div>
    </section>
  );
}

export default Hero;