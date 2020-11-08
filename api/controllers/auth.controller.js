const mongoose = require("mongoose");
const { genPassword, ErrorResponse } = require("../../utils");
const { asyncHandler } = require("../../middlewares");
const { getRequestToken, getAccessToken } = require('../../services/auth');
const twitterService = require('../../services/twitterService');

const User = mongoose.model("users");
const Organisation = mongoose.model("organisations");

module.exports.login = (req, res) => {
  res.send({ success: true, data: req.user });
};

module.exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, organisationName } = req.body;
  console.log("name: ", organisationName)
  const { hash, salt } = genPassword(password);
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    const org = await Organisation.findOne({name: organisationName});
    let organisationId = "";
    if(!org){
        const newOrg = await new Organisation({
            name: organisationName
        }).save();
        organisationId = newOrg._id;
    }
    const user = await new User({
      email,
      password: hash,
      salt,
      organisationId: organisationId || org._id
    }).save();
    
    res.send({ success: true, data: user });
  } else {
    next(new ErrorResponse("User with this email already exists!", 400));
  }
});

module.exports.getCurrentUser = (req, res) => {
  if (req.user) res.send({ success: true, data: req.user });
  else res.send({ success: false });
};

module.exports.logout = (req, res) => {
  req.logOut();
  res.redirect("/");
};


module.exports.twitterSignin = asyncHandler(async (req, res, next) => {
  const response = await getRequestToken(req.user.organisationId._id);

  // redirecting to  twitter oauth consent page
  res.redirect(302, response.twitter_auth_url);
});

module.exports.handleOauthCb = asyncHandler(async (req, res, next) => {
  console.log("Org ", req.query.orgId)
  const response = await getAccessToken(req.query);
  const organisation = {
    accessToken : response.oauth_token,
    tokenSecret : response.oauth_token_secret,
    twitterUserId: response.user_id,
    screenName: response.screen_name
  }
 
  await Organisation.findByIdAndUpdate(req.query.orgId, organisation, {  new: true})

  const profile = await twitterService.getUserDetails({token: response.oauth_token, token_secret: response.oauth_token_secret}, response.user_id);
  console.log('profile data:   ', profile);

  res.redirect(302, '/');
});