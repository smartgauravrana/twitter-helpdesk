const {apiCall} = require('../utils');

const twitterOauth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    callback: process.env.CALLBACK_URL,
    twitter_webhook_environment : 'dev'
}

const getRequestToken = async orgId => {
  const res = await apiCall({
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
    oauthCallback: `${twitterOauth.callback}?orgId=${orgId}`,
    queryStringReturnType: true
  });

  const twitter_auth_url = `https://api.twitter.com/oauth/authenticate?force_login=true&oauth_token=${res.oauth_token}`
  return {
    response_params: res,
    twitter_auth_url
  }
}


const getAccessToken = ({oauth_token, oauth_verifier}) => {
    const request_options = {
    url: `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
    method: 'POST',
    queryStringReturnType: true
  };
    
  return apiCall(request_options);
}

module.exports = {
    twitterOauth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        token: process.env.TWITTER_ACCESS_TOKEN,
        token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        twitter_webhook_environment : 'dev'
    },
    getRequestToken,
    getAccessToken
}