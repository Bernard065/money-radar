import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <div className="header"> 
        <h5>Where in the world</h5>
      </div>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Home;
