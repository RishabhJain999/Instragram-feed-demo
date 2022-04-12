import React from "react";
import Feed from "./Feed/Feed";
import { FeedContextProvider } from "../context/feedContext";
import FeedImagePreview from "./FeedImagePreview/FeedImagePreview";

import "./App.css";

function App() {
  return (
    <div className="app">
      <FeedContextProvider>
        <div className="app__left">
          <h1> User Feed </h1>
          <Feed />
        </div>
        <div className="app__right">
          <h1> Preview </h1>
          <FeedImagePreview />
        </div>
      </FeedContextProvider>
    </div>
  );
}

export default App;
