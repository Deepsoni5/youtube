import React, { useEffect, useState } from "react";

import { GOOGLE_API_KEY } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [searchVideos, setSearchVideos] = useState([]);
  let searchQuery = searchParams.get("video");

  useEffect(() => {
    getSearchVideoList();
  }, []);

  const getSearchVideoList = async () => {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_API_KEY}&type=video&part=snippet&q=${searchQuery}`;
    const data = await fetch(url);
    const searchVideosJson = await data.json();
    setSearchVideos(searchVideosJson?.items);
  };

  return (
    <div className="px-3 col-span-11 mt-2">
      <div className="flex flex-col px-3  items-center">
        <div className="p-2 m-2">
          {searchVideos?.map((video) => (
            <Link
              key={video?.id?.videoId}
              to={"/watch?v=" + video?.id?.videoId}
            >
              <div className="px-3 m-4 flex">
                <img
                  className="rounded-lg w-[400px] h-[210px] "
                  alt="thumbnail"
                  src={video?.snippet?.thumbnails?.medium?.url}
                />
                <ul className="flex flex-col justify-start ml-5 w-96">
                  <li className=" py-2 text-2xl ">{video?.snippet?.title}</li>
                  <li className="text-gray-500 text-[18px]">
                    {video?.snippet?.channelTitle}
                  </li>
                  <li className="text-gray-500 text-[18px]">
                    100 views{" "}
                    {(
                      Math.abs(
                        new Date(video?.snippet?.publishedAt) - new Date()
                      ) /
                      (60 * 60 * 24 * 1000)
                    ).toFixed(1)}{" "}
                    days ago
                  </li>
                  <li className="text-gray-500 mt-2 text-[15px]">
                    {video?.snippet?.description}
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
