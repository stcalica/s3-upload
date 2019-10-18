const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
var AWS = require('aws-sdk');

try {
  const bucketName = core.getInput('bucket');
  const package = core.getInput('package');
  const AWS_SECRET_KEY = core.getInput('AWS_SECRET_KEY');
  const AWS_SECRET_ID = core.getInput('AWS_SECRET_ID');
  const AWS_REGION = core.getInput('AWS_REGION');
  console.log(`Updating Bucket ${bucketName} with ${package}!`);

  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
  var body = fs.open(`./${package}`);

  var params = {
   Body: body,
   Bucket: bucketName
   };
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      core.setFailed(err);
    }
    else  console.log(data);
  });

} catch (error) {
  core.setFailed(error.message);
}
