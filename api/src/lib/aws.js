// Create service client module using ES6 syntax.
import { S3Client } from '@aws-sdk/client-s3'
// Set the AWS Region.
const REGION = 'us-east-1' //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
	region: REGION,
	credentials: {
		AccessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
		SecretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY
	},
})
export { s3Client }
