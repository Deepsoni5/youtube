import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  //early return
  if (!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-48">
      <ul className="">
        <li className="text-lg">
          <Link to="/">Home</Link>
        </li>
        <li className="text-lg">Shorts</li>
        <li className="text-lg">Videos</li>
        <li className="text-lg">Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li className="text-lg mt-2">Music</li>
        <li className="text-lg">Sports</li>
        <li className="text-lg">Gaming</li>
        <li className="text-lg">Movies</li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li className="text-lg mt-2">Music</li>
        <li className="text-lg">Sports</li>
        <li className="text-lg">Gaming</li>
        <li className="text-lg">Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
