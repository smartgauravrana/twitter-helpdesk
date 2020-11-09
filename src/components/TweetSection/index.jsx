import React, { useState } from "react";
import Moment from "moment";
import { useToasts } from 'react-toast-notifications'

import './TweetSection.scss'

export default function TweetSection({ tweet, onReply, setSelectedTweet }) {
    const [replyText, setReplyText] = useState('');
    const { addToast } = useToasts()

    const { mentionedBy } = tweet;

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            if (!replyText) {
                return alert("Please write some text to send!");
            }
            const data = {
                status: replyText,
                inReplyId: tweet.tweetId
            }
            onReply(data, () => {
                setReplyText('');
                addToast('Replied Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                  })
                setSelectedTweet(null);
            }, err => {
                const {data} = err.response;
                addToast(data.error, {
                    appearance: 'error',
                    autoDismiss: true,
                  })
            });
        }
    }

    return <div className="TweetSection">
        <div className="TweetSection__Header">
            <div className="TweetSection__HeaderProfile">
                <img src={mentionedBy.profilePic} alt="" className="profile-pic-thumb" />
                <div>{mentionedBy.username}</div>
            </div>
        </div>
        <div className="TweetSection__DetailsContainer">
            <div className="TweetSection__Details">
                <div className="day-name">{Moment(tweet.timestamp).fromNow()}</div>
                <div className="TweetSection__Tweet">
                    <img src={mentionedBy.profilePic} alt="" className="profile-pic-thumb" />
                    <div className="TweetSection__Text">{tweet.text}</div>
                </div>
            </div>
            <div className="TweetSection__Reply">
                <img src={mentionedBy.profilePic} alt="" className="profile-pic-thumb" />
                <input
                    type="text"
                    className='reply-input'
                    placeholder='Reply...'
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>

    </div>
}