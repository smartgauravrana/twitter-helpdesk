const mongoose = require('mongoose');

const Tweet = mongoose.model("tweets");

module.exports.getAllOrganizationTweets = async ({orgId, page, limit}) => {
    return await Tweet.find({organisationId: orgId}).skip((page -1)*limit).limit(limit);
}