const mongoose = require("mongoose");
const { string } = require("yup");
const { Schema } = mongoose;

const organisationSchema = new Schema({
  name: {   
    type: String,
    required: [true, 'Please add organisation name']
  },
  accessToken: {
       type: String
  },
  tokenSecret: {
       type: String
  },
  twitterUserId: {
     type: String
  },
  screenName: {
    type: String
  },
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("organisations", organisationSchema);