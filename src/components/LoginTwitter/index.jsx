import React from 'react';

export default function LoginTwitter() {
  return <div>
    <p className="twitter-msg">Connect, your twitter account to Start ;)</p>
    <a id="twitter-button" href="/api/twitter-signin" class="btn btn-block btn-social btn-twitter">
    <i class="fa fa-twitter"></i> Sign in with Twitter
  </a>
  </div>
}