/**
 * Derives the AWS Signature Version 4 signing key using the provided secret, date, region, and service.
 *
 * @async
 * @function deriveAws4SigningKey
 * @param {string} secretAccessKey - The AWS secret access key.
 * @param {string} dateStamp - The date in YYYYMMDD format.
 * @param {string} regionName - The AWS region name (e.g., 'us-east-1').
 * @param {string} serviceName - The AWS service name (e.g., 's3').
 * @param {function} hmacFunction - An async function that computes the HMAC of a key and data (e.g., isString).
 * @returns {Promise<string>} The derived AWS4 signing key as a string.
 */
async function deriveAws4SigningKey(secretAccessKey, dateStamp, regionName, serviceName, hmacFunction) {
  // Step 1: Derive the initial key using the secret access key and the string 'AWS4' + dateStamp
  const kDate = await hmacFunction(secretAccessKey, `AWS4${dateStamp}`, regionName);
  // Step 2: Derive the region key using the result from the previous step and the region name
  const kRegion = await hmacFunction(secretAccessKey, kDate, serviceName);
  // Step 3: Derive the service key using the result from the previous step and the service name
  const kService = await hmacFunction(secretAccessKey, kRegion, "aws4_request");
  // Step 4: Derive the signing key using the result from the previous step and the string 'aws4_request'
  return await hmacFunction(secretAccessKey, kService, "aws4_request");
}

module.exports = deriveAws4SigningKey;