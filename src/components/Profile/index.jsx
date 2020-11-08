import React from "react";

import './Profile.scss';

export default function Profile() {
    return <div className="Profile">
        <div className="Profile__container">
            <img src="https://randomuser.me/api/portraits/women/76.jpg" alt="" className="Profile__img"/>
        </div>

        <div className="Profile__username">Mary Gosha</div>
    </div>
}