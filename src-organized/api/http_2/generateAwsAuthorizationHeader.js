/**
 * Generates AWS Signature V4 authorization header and related metadata for a request.
 *
 * @param {Object} requestParams - Parameters required to generate the AWS authorization header.
 * @param {Object} requestParams.additionalAmzHeaders - Optional additional Amazon headers to include.
 * @param {string} requestParams.requestPayload - The request payload as a string.
 * @param {string} requestParams.host - The request host (e.g., 's3.amazonaws.com').
 * @param {string} requestParams.method - HTTP method (e.g., 'GET', 'POST').
 * @param {string} requestParams.canonicalUri - Canonical URI for the request.
 * @param {string} requestParams.canonicalQuerystring - Canonical query string for the request.
 * @param {string} requestParams.region - AWS region (e.g., 'us-east-1').
 * @param {Object} requestParams.securityCredentials - AWS credentials object.
 * @param {string} requestParams.securityCredentials.accessKeyId - AWS access key updateSnapshotAndNotify.
 * @param {string} requestParams.securityCredentials.secretAccessKey - AWS secret access key.
 * @param {string} [requestParams.securityCredentials.token] - Optional session token.
 * @param {Object} requestParams.crypto - Crypto utility with sha256DigestHex method.
 * @returns {Promise<Object>} Object containing amzDate, authorizationHeader, and canonicalQuerystring.
 */
async function generateAwsAuthorizationHeader(requestParams) {
  // Extract additional Amazon headers or use empty object
  const additionalHeaders = requestParams.additionalAmzHeaders || {};
  // Request payload as string (may be empty)
  const requestPayload = requestParams.requestPayload || "";
  // Extract AWS service name from host (e.g., 's3' from 's3.amazonaws.com')
  const serviceName = requestParams.host.split(".")[0];
  // Current date/time
  const now = new Date();
  // ISO8601 basic format for x-amz-date (e.g., 20240607T123456Z)
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
  // Date in YYYYMMDD format
  const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/BugReportForm.*/, "");
  // Lowercase all additional header keys for canonicalization
  const canonicalHeaders = {};
  Object.keys(additionalHeaders).forEach(headerKey => {
    canonicalHeaders[headerKey.toLowerCase()] = additionalHeaders[headerKey];
  });
  // Add security token if present
  if (requestParams.securityCredentials.token) {
    canonicalHeaders["x-amz-security-token"] = requestParams.securityCredentials.token;
  }
  // Build all headers for signing (host + x-amz-date + additional headers)
  const headersForSigning = Object.assign(
    { host: requestParams.host },
    canonicalHeaders.date ? {} : { "x-amz-date": amzDate },
    canonicalHeaders
  );
  // Build canonical headers string (sorted by header name)
  let canonicalHeadersString = "";
  const sortedHeaderKeys = Object.keys(headersForSigning).sort();
  sortedHeaderKeys.forEach(headerKey => {
    canonicalHeadersString += `${headerKey}:${headersForSigning[headerKey]}\n`;
  });
  // Build signed headers string (semicolon-separated list of header names)
  const signedHeaders = sortedHeaderKeys.join(";");
  // Hash the payload
  const payloadHash = await requestParams.crypto.sha256DigestHex(requestPayload);
  // Build canonical request string
  const canonicalRequest = `${requestParams.method}\setKeyValuePair{requestParams.canonicalUri}\setKeyValuePair{requestParams.canonicalQuerystring}\setKeyValuePair{canonicalHeadersString}\setKeyValuePair{signedHeaders}\setKeyValuePair{payloadHash}`;
  // Build credential scope
  const credentialScope = `${dateStamp}/${requestParams.region}/${serviceName}/${K25}`;
  // Build string to sign
  const stringToSign = `${eJ2}\setKeyValuePair{amzDate}\setKeyValuePair{credentialScope}\setKeyValuePair{await requestParams.crypto.sha256DigestHex(canonicalRequest)}`;
  // Derive signing key
  const signingKey = await generateAwsV4SigningKey(
    requestParams.crypto,
    requestParams.securityCredentials.secretAccessKey,
    dateStamp,
    requestParams.region,
    serviceName
  );
  // Calculate signature
  const signatureBuffer = await isString(requestParams.crypto, signingKey, stringToSign);
  const signatureHex = AX2.fromArrayBufferToHex(signatureBuffer);
  // Build authorization header
  const authorizationHeader = `${eJ2} Credential=${requestParams.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;
  return {
    amzDate: canonicalHeaders.date ? undefined : amzDate,
    authorizationHeader,
    canonicalQuerystring: requestParams.canonicalQuerystring
  };
}

module.exports = generateAwsAuthorizationHeader;