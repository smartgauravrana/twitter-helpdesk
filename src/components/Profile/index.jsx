import React from "react";

import './Profile.scss';

export default function Profile({
    tweet,
    onClose
}) {
    const {mentionedBy} = tweet;

    return <div className="Profile">
        <div className="close-icon" onClick={onClose}>
        <i aria-hidden="true" className="fa fa-times"></i>
        </div>
        
        <div className="Profile__container">
            <img src={mentionedBy.profilePic.replace('_normal', '')} alt="" className="Profile__img"/>
        </div>

        <div className="Profile__username">{mentionedBy.username}</div>
    </div>
}