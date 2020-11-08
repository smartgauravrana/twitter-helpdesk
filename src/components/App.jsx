import React from "react";

import TweetsList from "components/TweetsList";
import TweetListItem from "components/TweetListItem";
import TweetSection from "components/TweetSection";
import Profile from "components/Profile";
import Auth from "pages/Auth";
import "./App.scss";

export default function App(){
    return <div>
        <div className="Container">
            <div>
                <h1 className="AppTitle">Tweeto</h1>
            </div>
            <div className="Content">
                <Auth />
                {/* <div className="TweetsContainer">
                    <TweetsList />
                </div>
                <div className="TweetDetailContainer">
                    <TweetSection/>
                    <Profile />
                </div> */}
            </div>           
        </div>
    </div>
}