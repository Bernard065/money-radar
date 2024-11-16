import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="size-full flex fle-col gap-6 items-center justify-center">
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Home;
