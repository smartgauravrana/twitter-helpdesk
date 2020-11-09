const { apiCall } = require('../utils');

const getUserDetails = (tokenInfo, twitterId) => {
  console.log("get inside userDetails:")
  const res = apiCall({
    url: `https://api.twitter.com/1.1/users/show.json?user_id=${twitterId}`,
    tokenInfo
  });
  return JSON.parse(res.toString());
};

const subscribeToUserActivity = async (tokenInfo) => {
  await apiCall({
    url: `https://api.twitter.com/1.1/account_activity/all/${process.env.TWITTER_WEBHOOK_ENV}/subscriptions.json`,
    method: 'POST',
    tokenInfo
  });
}

const isUserActivitySubscribed = async tokenInfo => {
  try {
    const res = await apiCall({
      url: `https://api.twitter.com/1.1/account_activity/all/${process.env.TWITTER_WEBHOOK_ENV}/subscriptions.json`,
      tokenInfo
    });
    if(!res.errors){
      return true;
    } else{
      return false;
    }
  } catch {
    return false;
  }
}

const postReply = async ({tokenInfo, status, inReplyId}) => {
  const res = await apiCall({
    url: `https://api.twitter.com/1.1/statuses/update.json`,
    method: 'POST',
    tokenInfo,
    form: {
      status, in_reply_to_status_id : inReplyId, auto_populate_reply_metadata: true 
    }
  });
  return res;
}

module.exports = {
  getUserDetails,
  subscribeToUserActivity,
  isUserActivitySubscribed,
  postReply
}