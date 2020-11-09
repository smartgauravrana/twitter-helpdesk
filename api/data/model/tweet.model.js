const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentionedBySchema = new Schema({
  twitterId: {type: String},
  username: {type: String},
  name: {type: String},
  profilePic: {type: String}
})

const tweetSchema = new Schema({
  forUserId: {
      type: String
  },
  text: {
    type: String
  },
  timestamp: {
    type: Date
  },
  mentionedBy: mentionedBySchema,
  tweetId: {
    type: String
  },
  organisationId: {type: Schema.Types.ObjectId, ref: "organisations"},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("tweets", tweetSchema);