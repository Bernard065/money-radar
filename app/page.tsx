import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className=" flex size-full  flex-col items-center justify-center gap-6">
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Home;
