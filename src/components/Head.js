import React, { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  YOUTUBE_SEARCH_API_ONE,
  YOUTUBE_SEARCH_API_TWO,
  GOOGLE_API_KEY,
  DOMAIN,
} from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //make an api call after every key press
    //but if the difference between 2 api call < 200ms
    //decline the api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_API_ONE + searchQuery + YOUTUBE_SEARCH_API_TWO
    );
    const json = await data.json();
    setSuggestions(json.items);
    dispatch(
      cacheResults({
        [searchQuery]: json.items,
      })
    );
  };

  return (
    <div className="grid grid-flow-col p-3 m-2 shadow-lg">
      {/**hamburger menu and image of youtube */}
      <div className="flex col-span-1">
        <img
          className="h-6 cursor-pointer"
          onClick={() => toggleMenuHandler()}
          alt="hamburger menu"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
        />

        <img
          className="h-14 mt-[-15px] mx-2"
          alt="youtube logo"
          src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
        />
      </div>
      {/** search input*/}
      <div className="col-span-10 px-10">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            placeholder="Search"
            onFocus={() => setShowSuggestions(true)}
          />
          <button className="border border-gray-400 h-full  px-5 p-2 bg-gray-100 rounded-r-full ">
            <BsSearch />
          </button>
        </div>
        {/* search results */}
        {showSuggestions && searchQuery !== "" && (
          <div className="fixed top-18 bg-white py-2 px-2 w-[33rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {searchQuery !== "" &&
                // ...

                // ...

                suggestions.map((s, i) => {
                  return (
                    <li
                      key={i}
                      className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchResult(s.snippet.title);
                        console.log(searchResult);
                        window.location.href =
                          DOMAIN +
                          "/search?video=" +
                          decodeURI(s.snippet.title);
                      }}
                    >
                      {s.snippet.title}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
