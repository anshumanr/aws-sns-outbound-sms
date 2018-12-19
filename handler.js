'use strict';

const snsPublish = require('aws-sns-publish');

module.exports.sendsms = (event, context, callback) => {

  console.log(event.queryStringParameters);

  if (event.queryStringParameters !== null && event.queryStringParameters.phone !== null && event.queryStringParameters.text !== null) {
      var phnum = event.queryStringParameters.phone;
      var text = event.queryStringParameters.text;
  }
  else {
      var response = {
          statusCode: 400,
          body: 'Bad request'
      };
      callback(null, response);
  }

  context.callbackWaitsForEmptyEventLoop = false;

  snsPublish(text, {phone: phnum}).then((err,messageId) => {
     if (err) {
         response = {
             statusCode: 500,
             body: JSON.stringify({
                 message: err,
             }),
         };
     }
     console.log(messageId);

      response = {
          statusCode: 200,
          body: JSON.stringify({
              message: messageId,
          }),
      };

      callback(null, response);
    //=> '6014fe16-26c1-11e7-93ae-92361f002671'
  })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
