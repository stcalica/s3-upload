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

  const s3 = new AWS.S3({apiVersion: '2006-03-01', accessKeyId: AWS_SECRET_ID, secretAccessKey:AWS_SECRET_KEY, region:AWS_REGION  });
  var body = fs.open(`./${package}`);

  const params = {
   Body: body,
   Bucket: bucketName
   };
   s3.upload(params, (err, data) => {
     if(err){
       console.log(`Failed upload to ${bucketName}`);
       throw err;
     } else {
       console.log(`Succesful upload to ${bucketName}`);
     }
   });

} catch (error) {
 core.setFailed(error.message);
}
