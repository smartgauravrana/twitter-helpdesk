const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const {isLogin} = require('../../middlewares');

const authCtrl = require('../controllers/auth.controller');
const webhookCtrl = require('../controllers/webhooks.controller');
const tweetsCtrl = require('../controllers/tweets.controller');

router.post(
    "/login",
    function (req, res, next) {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return res
            .status(500)
            .send({ success: false, error: "Something went wrong!" });
        }
        if (!user) {
          return res
            .status(404)
            .send({ success: false, error: "User not exist!" });
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return next();
        });
      })(req, res, next);
    },
    authCtrl.login
  );

router.post("/register", authCtrl.register);

router.get("/current_user", authCtrl.getCurrentUser);

router.get("/logout", authCtrl.logout);

// router.get('/callback', (req, res) => {

// })

// WEBHOOKS
router
  .route("/webhooks")
  .get(webhookCtrl.handleCRCrequest)
  .post(webhookCtrl.handleWebhookData)

// twitter sign in
router
 .route('/twitter-signin')
 .get(isLogin, authCtrl.twitterSignin);

router
    .route('/auth/callback')
    .get(authCtrl.handleOauthCb);

// tweets
router
    .route('/tweets')
    .get(isLogin, tweetsCtrl.getAllForOrganisation)
    .post(isLogin, tweetsCtrl.replyOnTweet)

// router
//     .route('/tweets/:tweetId')
    

module.exports = router;
