import {
  useState,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { baseUrl } from "../components/baseUrl/BaseUrl";
import axios from "axios";

export const feedContext = createContext({
  userFeed: [],
  userImagePreview: [],
  previewImage: () => {},
  Imagelikes: () => {},
  sortMaxLikes: () => {},
  sortMinLikes: () => {},
});

export function FeedContextProvider({ children }) {
  const [userFeed, setUserFeed] = useState();
  const [userImagePreview, setUserImagePreview] = useState();

  useEffect(() => {
    // calling an instragram api(provided)
    (async () => {
      const response = await axios.get(baseUrl);
      setUserFeed(response.data);
    })();
  }, []);

  const sortMaxLikes = () => {
    const userFeedIsSorted = userFeed.sort(function (a, b) {
      return b.likes - a.likes;
    });
    setUserFeed(userFeedIsSorted);
  };

  const sortMinLikes = () => {
    setUserFeed(
      userFeed.sort(function (a, b) {
        return a.likes - b.likes;
      })
    );
  };

  const previewImage = (timeDetails) => {
    setUserImagePreview([
      userFeed.find(({ timestamp }) => {
        return timestamp === timeDetails;
      }),
    ]);
  };

  const Imagelikes = (timeDetails) => {
    const { Image, timestamp, likes } = userFeed.find(({ timestamp }) => {
      return timestamp === timeDetails;
    });

    setUserFeed(
      userFeed.map((details) => {
        return details.timestamp === timestamp
          ? {
              Image,
              timestamp,
              likes: likes + 1,
            }
          : details;
      })
    );
    setUserImagePreview([
      {
        Image,
        timestamp,
        likes: likes + 1,
      },
    ]);
  };

  return (
    <feedContext.Provider
      value={{
        userFeed,
        setUserFeed,
        previewImage,
        userImagePreview,
        Imagelikes,
        sortMaxLikes,
        sortMinLikes,
      }}
    >
      {children}
    </feedContext.Provider>
  );
}

export const useFeedContext = () => {
  const {
    userFeed,
    setUserFeed,
    previewImage,
    userImagePreview,
    Imagelikes,
    sortMaxLikes,
    sortMinLikes,
  } = useContext(feedContext);
  return {
    userFeed,
    setUserFeed,
    previewImage,
    userImagePreview,
    Imagelikes,
    sortMaxLikes,
    sortMinLikes,
  };
};
