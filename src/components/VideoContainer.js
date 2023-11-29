import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import axios from "axios";
import { Link } from "react-router-dom";
const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await axios.get(YOUTUBE_VIDEO_API);

    setVideos(data.data.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos.map((video, index) => {
        return (
          <Link to={"/watch?v=" + video.id} key={index}>
            <VideoCard key={video.id} info={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
