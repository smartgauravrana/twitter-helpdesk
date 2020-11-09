import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TweetsList from "components/TweetsList";
import TweetListItem from "components/TweetListItem";
import TweetSection from "components/TweetSection";
import Profile from "components/Profile";

// redux actions
import { getTweets, postReply } from 'redux/modules/tweets';

import './Home.scss';

function Home({
  getTweets,
  tweets,
  postReply
}) {

  const [selectedTweet, setSelectedTweet] = useState(null);

  useEffect(() => {
    getTweets();
  }, [])

  return <>
    <div className="TweetsContainer">
      {!tweets.isLoading && <TweetsList
        tweets={tweets}
        setSelectedTweet={setSelectedTweet}
        loadMore={getTweets}
        selectedTweet={selectedTweet} />}
    </div>
    {
      selectedTweet &&
      <div className="TweetDetailContainer">
        <TweetSection tweet={selectedTweet} onReply={postReply} setSelectedTweet={setSelectedTweet} />
        <Profile tweet={selectedTweet} onClose={() => setSelectedTweet(null)} />
      </div>}
  </>
};

export default connect(({ tweets }) => ({
  tweets
}), {
  getTweets,
  postReply
})(Home)