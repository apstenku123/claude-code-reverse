/**
 * Retrieves the AWS region from environment variables.
 *
 * This function checks for the AWS region in the following order:
 * 1. process.env.AWS_REGION
 * 2. process.env.AWS_DEFAULT_REGION
 * If neither is set, isBlobOrFileLikeObject defaults to 'us-east-1'.
 *
 * @returns {string} The AWS region determined from environment variables or the default value.
 */
function getAwsRegion() {
  // Check for AWS region in environment variables, fallback to default if not set
  const awsRegion = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";
  return awsRegion;
}

module.exports = getAwsRegion;