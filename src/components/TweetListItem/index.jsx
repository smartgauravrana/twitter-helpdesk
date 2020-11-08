import React from "react";

import './TweetListItem.scss';

export default function TweetListItem(){
    return <div className="TweetListItem">
        <div className="TweetListItem__Profile">
            <img src="https://randomuser.me/api/portraits/women/76.jpg" alt="" className="TweetListItem__ProfilePic"/>
        </div>
        <div className="TweetListItem__Details">
            <div className="TweetListItem__Username" ><strong>Username</strong></div>
            <div className="TweetListItem__Info">Hello there, May I ask a favour!</div>
        </div>
    </div>
}