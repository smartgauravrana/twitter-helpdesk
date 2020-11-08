const {apiCall} = require('../utils');

const getUserDetails = (tokenInfo, twitterId) => {
  console.log("get inside userDetails:")
  const res = apiCall({
    url:`https://api.twitter.com/1.1/users/show.json?user_id=${twitterId}`,
    tokenInfo
  });
  return JSON.parse(res.toString());
};

const subscribeToUserActivity = async (tokenInfo) => {
  await apiCall({
    url:`https://api.twitter.com/1.1/account_activity/all/${process.env.TWITTER_WEBHOOK_ENV}/subscriptions.json`,
    tokenInfo
  });
}

module.exports = {
    getUserDetails
}