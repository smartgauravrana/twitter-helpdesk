const { getChallengeResponse } = require('../../utils');
const mongoose = require('mongoose');

const Organisation = mongoose.model("organisations");
const Tweet = mongoose.model("tweets");


module.exports.handleCRCrequest = (req, res, next) => {
  const { crc_token } = req.query;
  const response = { response_token: 'sha256=' + getChallengeResponse(crc_token, process.env.TWITTER_CONSUMER_SECRET) };
  res.send(response)
}

module.exports.handleWebhookData = async (req, res, next) => {
  console.log("Webhook Data: ", req.body);
  const { for_user_id } = req.body;
  if (req.body.tweet_create_events && 'user_has_blocked' in req.body && !req.body.user_has_blocked) {
    // save tweets in db
    const organisation = await Organisation.findOne({ twitterUserId: for_user_id });
    if (organisation) {
      const tweets = [];
      for (let item of req.body.tweet_create_events) {
        const { timestamp_ms, user, text } = item;
        const mentionedBy = {
          twitterId : user.id, 
          username : user.screen_name,
          name : user.name,
          profilePic : user.profile_image_url_https
        }
        const tweet = {
          forUserId: for_user_id,
          text,
          timestamp: timestamp_ms,
          organisationId: organisation._id,
          mentionedBy
        };
        tweets.push(tweet);
      }
      await Tweet.insertMany(tweets);
    }

  }
  res.send({});
}