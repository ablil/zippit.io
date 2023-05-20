import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <main className="h-screen m-0 p-0 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold">
        4<span className="text-sky-600">0</span>4
      </h1>
      <h2 className="text-4xl text-gray-500 py-4">Oooops! this page does NOT exists</h2>
    </main>
  );
};

export default ErrorPage;
