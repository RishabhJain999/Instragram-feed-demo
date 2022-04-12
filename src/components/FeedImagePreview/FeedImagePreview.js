import React, { useState, useEffect } from "react";
import { useFeedContext } from "../../context/feedContext";
import "../FeedCard/FeedCard.css";

function FeedImagePreview() {
  const [disableLikes, setDisableLikes] = useState(false);
  const [image, setImage] = useState();
  const { userImagePreview, Imagelikes } = useFeedContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); 
  });

  return userImagePreview ? (
    userImagePreview.map(({ Image, likes, timestamp }) => {
      return (
        <div className="userfeed" key={Image}>
          <div className="userfeed__preview">
            <h3>
              This picture was posted on
              <span className="highlight"> {timestamp} </span>having
              <span className="highlight"> {likes} </span>likes.
            </h3>
            <button
              title="You only like once."
              disabled={disableLikes && Image === image}
              className="userfeed__preview--likes"
              onClick={() => {
                Imagelikes(timestamp);
                setImage(Image);
                setDisableLikes(true);
              }}
            >
              I like this
            </button>

            {disableLikes && Image === image && (
              <p style={{ color: "green", paddingTop: "9px" }}>
                You have liked the image. Likes is disabled now
              </p>
            )}
          </div>
          <div className="userfeed__images">
            <img src={Image} alt={likes} />
          </div>
        </div>
      );
    })
  ) : (
    <div
      style={{ textAlign: "center", marginTop: "15rem", marginLeft: "2rem" }}
    >
      {" "}
      Click any image to show preview.
    </div>
  );
}

export default FeedImagePreview;
