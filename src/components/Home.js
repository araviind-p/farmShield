import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ isAuthenticated, setActiveLink }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100dvh-72px)] md:h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-900 to-green-700 text-gray-200 p-8 pb-[144px] md:pb-0">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-200">
        Welcome to FarmShield
      </h1>
      <button
        onClick={() => {
          if (isAuthenticated) {
            setActiveLink("Dashboard");
          } else {
            setActiveLink("Login");
          }
          navigate("/dashboard");
        }}
        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-gray-200 rounded-lg font-semibold"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Home;
