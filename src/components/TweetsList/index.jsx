import React from "react";
import { isEmpty } from "utils";
import InfiniteScroll from "react-infinite-scroller";

import TweetListItem from "components/TweetListItem"
import './TweetsList.scss';

export default function TweetsList({ tweets, setSelectedTweet, selectedTweet, loadMore }) {
    console.log("tweets: ", tweets)
    const { data, hasMore, isLoading } = tweets;
    return <div className="TweetsList">
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore && !isLoading}
            initialLoad={true}
        >
            {!isEmpty(data) && data.map(item =>
                <TweetListItem key={item._id} tweet={item} onClick={() => setSelectedTweet(item)} selectedTweet={selectedTweet} />)}
        </InfiniteScroll>

    </div>
}