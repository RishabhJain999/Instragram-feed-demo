import React from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useFeedContext } from "../../context/feedContext";

function Feed() {
  return (
    <div>
      <FeedCard />
    </div>
  );
}

export default Feed;
