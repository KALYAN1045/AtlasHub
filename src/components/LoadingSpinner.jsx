import React from "react";
import gifUrl from "../assets/Earth.gif";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center ">
      <div className="flex items-center gap-6">
        <img src={gifUrl} alt="Loading..." className="w-12 h-12" />
        <span className="text-3xl text-blue-950 font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
