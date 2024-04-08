import React from "react";

function Contact() {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <iframe
          title="map"
          className="w-full h-full grayscale contrast-125 opacity-50"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <form
          action="https://formsubmit.co/santhoshtechnologies22@gmail.com"
          method="POST"
          className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
        >
          <h2 className="text-gray-900 text-2xl mb-4 font-semibold title-font">
            Get in Touch
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete={"email"}
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your email address"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Your Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 h-32 text-base outline-none text-gray-700 py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button className="text-white bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg mt-2">
            Send Message
          </button>
          <p className="text-xs text-gray-500 mt-3">
            * All details are required for communication.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
