import React, { useState, useEffect } from "react";
import { useFeedContext } from "../../context/feedContext";
import "./FeedCard.css";

function FeedCard() {
  const [changeUserFeed, setChangeUserFeed] = useState(false);
  const { userFeed, setUserFeed, previewImage, sortMaxLikes, sortMinLikes } =
    useFeedContext();
  console.log(userFeed);

  useEffect(() => {
    setUserFeed(userFeed);
  }, [changeUserFeed]);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <span>
          <button
            className="btn"
            onClick={() => {
              sortMaxLikes();
              setChangeUserFeed(!changeUserFeed);
            }}
          >
            sortByMaxLikes
          </button>
          <button
            className="btn"
            onClick={() => {
              sortMinLikes();
              setChangeUserFeed(!changeUserFeed);
            }}
          >
            sortByMinLikes
          </button>
        </span>
      </div>
      {userFeed !== undefined
        ? userFeed.map(({ Image, likes, timestamp }, i) => {
            return (
              <div className="userfeed" key={i}>
                <div
                  onClick={() => previewImage(timestamp)}
                  className="userfeed__images"
                >
                  <img src={Image} alt="userFeedImage" />
                </div>
                <div className="userfeed__images--details">
                  <span className="details">
                    <i className="fa-solid fa-heart"></i>
                    <p className="details--info">{likes}</p>
                  </span>

                  <p>{timestamp}</p>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
}

export default FeedCard;
