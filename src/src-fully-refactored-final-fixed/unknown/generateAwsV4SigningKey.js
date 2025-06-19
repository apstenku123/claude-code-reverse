/**
 * Generates an AWS Signature Version 4 signing key by performing a series of HMAC operations.
 *
 * @async
 * @function generateAwsV4SigningKey
 * @param {string} secretAccessKey - The AWS secret access key used as the base for signing.
 * @param {string} dateStamp - The date in YYYYMMDD format for the signing process.
 * @param {string} regionName - The AWS region name (e.g., 'us-east-1').
 * @param {string} serviceName - The AWS service name (e.g., 's3', 'ec2').
 * @param {function} hmacFunction - An async function that performs HMAC signing: hmacFunction(key, message) => Promise<string>.
 * @returns {Promise<string>} The derived AWS Signature Version 4 signing key as a string.
 *
 * The signing key is derived by sequentially HMAC-ing the secret key with the date, region, service, and the literal string 'aws4_request'.
 */
async function generateAwsV4SigningKey(secretAccessKey, dateStamp, regionName, serviceName, hmacFunction) {
  // Step 1: Derive the initial key using the secret access key and the date
  const kDate = await hmacFunction(secretAccessKey, `AWS4${dateStamp}`);

  // Step 2: Derive the region key using the previous result and the region name
  const kRegion = await hmacFunction(secretAccessKey, kDate, regionName);

  // Step 3: Derive the service key using the previous result and the service name
  const kService = await hmacFunction(secretAccessKey, kRegion, serviceName);

  // Step 4: Derive the final signing key using the previous result and the literal string 'aws4_request'
  const signingKey = await hmacFunction(secretAccessKey, kService, "aws4_request");

  return signingKey;
}

module.exports = generateAwsV4SigningKey;
