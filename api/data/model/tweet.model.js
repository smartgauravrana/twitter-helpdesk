const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  mentionedBy: {
      type: Object
  },
  organisationId: {type: Schema.Types.ObjectId, ref: "organisations"},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("tweets", tweetSchema);