import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import heroSnapshot from "@/assets/heroSnapshot.png";


function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();

  const handleClick = () => {
    window.open("https://github.com/akshatmoradiya03", "_blank");
  };

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <>
      <section className="pt-24 pb-20 bg-white">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span>Start</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                building a Resume
              </span>{" "}
              <span>for your next Job</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
              Build. Refine. Shine. With AI-Driven Resumes
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 flex flex-col sm:flex-row items-center justify-center">
              <Button onClick={handleGetStartedClick} size="lg" className="transition-transform duration-200 hover:scale-105">
                Get Started
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="ml-0 sm:ml-2 mt-2 sm:mt-0 transition-transform duration-200 hover:scale-105"
              >
                <a
                  href="https://github.com/akshatmoradiya03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 bg-gradient-to-r from-green-400 to-purple-500 h-11 rounded-t-xl">
                  <div className="flex space-x-1.5">
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                    <FaCircle className="w-3 h-3 text-white hover:text-gray-300 transition duration-300 transform hover:scale-125" />
                  </div>
                  <FaInfoCircle className="text-white hover:text-gray-300 transition duration-300 transform hover:rotate-45" />
                </div>
                <img
                  className="object-cover py-2 px-4 rounded-b-lg transition duration-300 transform hover:scale-105"
                  src={heroSnapshot}
                  alt="Dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white" aria-labelledby="footer-heading">
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 p-5 flex justify-between">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2024 Ai-Resume-Builder. All rights reserved.
          </p>
          <div>
            <Button variant="secondary" onClick={handleClick}>
              <FaGithub className="w-4 h-4 mr-1" />
              GitHub
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;