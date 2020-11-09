import React from "react";

import './TweetListItem.scss';

export default function TweetListItem({ tweet, onClick, selectedTweet }) {
    const { mentionedBy, text } = tweet;
    return <div className={`TweetListItem ${selectedTweet && selectedTweet._id === tweet._id ? 'selectedTweet' : ''}`} onClick={onClick}>
        <div className="TweetListItem__Profile">
            <img
                src={mentionedBy.profilePic}
                alt=""
                className='TweetListItem__ProfilePic' />
        </div>
        <div className="TweetListItem__Details">
            <div className="TweetListItem__Username" ><strong>{mentionedBy.username}</strong></div>
            <div className="TweetListItem__Info">{text}</div>
        </div>
    </div>
}