const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {   
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]},
  password: {
    type: String,
    required: [true, "Please add password"],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'moderator'],
    default: 'user'
  },
  salt: { type: String, select: false },
  organisationId: {type: Schema.Types.ObjectId, ref: "organisations"},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model("users", userSchema);