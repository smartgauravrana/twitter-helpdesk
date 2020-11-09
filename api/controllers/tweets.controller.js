const { asyncHandler } = require("../../middlewares");
const tweetsService = require('../../services/tweetsService');
const twitterService = require("../../services/twitterService");
const { ErrorResponse } = require("../../utils");


module.exports.getAllForOrganisation = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const tweets = await tweetsService.getAllOrganizationTweets({
        orgId: req.user.organisationId._id,
        page,
        limit
    });
    res.send({
        success: true,
        data: tweets
    })
})

module.exports.replyOnTweet = asyncHandler(async (req, res, next) => {
    const { status, replyForUsername, inReplyId} = req.body;

    if(!status){
        return next(new ErrorResponse('status is Required', 400));
    }
    // if(!replyForUsername){
    //     return next(new ErrorResponse('replyForUsername is Required', 400));
    // }
    if(!inReplyId){
        return next(new ErrorResponse('inReplyId is required', 400))
    }

    const user = req.user;
    const tokenInfo = {
        token: user.organisationId.accessToken,
        token_secret: user.organisationId.tokenSecret
    }
    const data = await twitterService.postReply({
        tokenInfo,
        status,
        inReplyId
    });
    if(data.errors){
        return next(new ErrorResponse(data.errors[0].message, 400))
    }
    res.send({success: true});
})