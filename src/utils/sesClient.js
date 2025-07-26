require("dotenv");

// Moduler JS :mjs
// import {SESClient} from "@aws-sdk/client-ses";

// const REGION = "us-east-1";

// // named export
// const sesClient = new SESClient({region: REGION });
// export {sesClient};


// But our whole code is cjs

const {SESClient} =  require("@aws-sdk/client-ses");

const REGION = "eu-north-1";

// named export
const sesClient = new SESClient({region: REGION, credentials: {
    // TODO
    // aws_access_key
    accessKeyId: process.env.AWS_ACCESS_KEY,
    // aws_secret_key
    secretAccessKey: process.env.AWS_SECRET_KEY,
} });

module.exports = {sesClient};