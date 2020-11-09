const request = require('request');
const queryString = require('query-string');

function getOauthHeaders(tokenInfo = {}){
    const {token, token_secret} = tokenInfo;
    const oauth = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    };
    if(token) oauth.token = token;
    if(token_secret) oauth.token_secret = token_secret;
    return oauth;
  }

function apiCall({
    method='GET',
    tokenInfo,
    url,
    data = {},
    oauthCallback,
    form,
    queryStringReturnType = false
}) {
    var request_options = {
        url,
        method,
        oauth: {
          ...getOauthHeaders(tokenInfo)          
        }
      }
    
    if(oauthCallback) request_options.oauth.callback = oauthCallback;

    if(form) request_options.form = form;

    return new Promise (function (resolve, reject) {
        request(request_options, function(error, response) {
          if (error) {
            reject(error)
          }
          else {
            let responseData;
            if(queryStringReturnType){
                responseData = queryString.parse(response.body);
                return resolve(responseData);
            }
            let test = response.body;
            try{
              resolve(JSON.parse(test));
            }catch(e){
              console.log('Json parsing err ', e)
              resolve({})
            }
          }
        })
      })
};

module.exports = apiCall;