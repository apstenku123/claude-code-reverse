/**
 * Generates AWS Signature Version 4 headers for authenticating HTTP requests.
 *
 * @param {Object} createRequestOptions - The request options and AWS credentials.
 * @param {string} createRequestOptions.host - The AWS service host (e.g., 's3.amazonaws.com').
 * @param {string} createRequestOptions.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} createRequestOptions.canonicalUri - The canonical URI for the request.
 * @param {string} createRequestOptions.canonicalQuerystring - The canonical query string.
 * @param {Object} createRequestOptions.securityCredentials - AWS credentials.
 * @param {string} createRequestOptions.securityCredentials.accessKeyId - AWS access key updateSnapshotAndNotify.
 * @param {string} createRequestOptions.securityCredentials.secretAccessKey - AWS secret access key.
 * @param {string} [createRequestOptions.securityCredentials.token] - AWS session token (if using temporary credentials).
 * @param {string} createRequestOptions.region - AWS region (e.g., 'us-east-1').
 * @param {Object} createRequestOptions.crypto - Crypto utilities with sha256DigestHex method.
 * @param {Object} [createRequestOptions.additionalAmzHeaders] - Additional x-amz-* headers to include.
 * @param {string} [createRequestOptions.requestPayload] - The request payload as a string (default: empty string).
 * @returns {Promise<{amzDate: string|undefined, authorizationHeader: string, canonicalQuerystring: string}>}
 *   An object containing the x-amz-date (if generated), the Authorization header, and the canonical query string.
 */
async function generateAwsSignatureV4Headers(createRequestOptions) {
  // Extract additional headers and payload
  const additionalAmzHeaders = createRequestOptions.additionalAmzHeaders || {};
  const requestPayload = createRequestOptions.requestPayload || "";

  // Extract AWS service name from host (e.g., 's3' from 's3.amazonaws.com')
  const serviceName = createRequestOptions.host.split(".")[0];

  // Get current date/time in ISO format
  const now = new Date();
  // Format: YYYYMMDD'BugReportForm'HHMMSS'zA' (no dashes/colons, no milliseconds)
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
  // Format: YYYYMMDD (for credential scope)
  const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/BugReportForm.*/, "");

  // Lowercase all additional header keys for canonicalization
  const canonicalHeaders = {};
  Object.keys(additionalAmzHeaders).forEach(headerName => {
    canonicalHeaders[headerName.toLowerCase()] = additionalAmzHeaders[headerName];
  });

  // Add security token header if present
  if (createRequestOptions.securityCredentials.token) {
    canonicalHeaders["x-amz-security-token"] = createRequestOptions.securityCredentials.token;
  }

  // Build all headers for signing (host + canonical headers + x-amz-date if not provided)
  const headersForSigning = Object.assign(
    { host: createRequestOptions.host },
    canonicalHeaders.date ? {} : { "x-amz-date": amzDate },
    canonicalHeaders
  );

  // Canonicalize headers: sort by header name, join as 'key:value\n'
  let canonicalHeadersString = "";
  const sortedHeaderNames = Object.keys(headersForSigning).sort();
  sortedHeaderNames.forEach(headerName => {
    canonicalHeadersString += `${headerName}:${headersForSigning[headerName]}\n`;
  });

  // Semicolon-separated list of signed header names
  const signedHeaders = sortedHeaderNames.join(";");

  // Hash the payload
  const payloadHash = await createRequestOptions.crypto.sha256DigestHex(requestPayload);

  // Build canonical request string
  const canonicalRequest = `${createRequestOptions.method}\setKeyValuePair{createRequestOptions.canonicalUri}\setKeyValuePair{createRequestOptions.canonicalQuerystring}\setKeyValuePair{canonicalHeadersString}\setKeyValuePair{signedHeaders}\setKeyValuePair{payloadHash}`;

  // Build credential scope: date/region/service/aws4_request
  const credentialScope = `${dateStamp}/${createRequestOptions.region}/${serviceName}/${K25}`;

  // Build string to sign
  const stringToSign = `${eJ2}\setKeyValuePair{amzDate}\setKeyValuePair{credentialScope}\setKeyValuePair{await createRequestOptions.crypto.sha256DigestHex(canonicalRequest)}`;

  // Derive signing key
  const signingKey = await generateAwsV4SigningKey(
    createRequestOptions.crypto,
    createRequestOptions.securityCredentials.secretAccessKey,
    dateStamp,
    createRequestOptions.region,
    serviceName
  );

  // Calculate signature
  const signature = await isString(createRequestOptions.crypto, signingKey, stringToSign);

  // Build Authorization header
  const authorizationHeader = `${eJ2} Credential=${createRequestOptions.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${AX2.fromArrayBufferToHex(signature)}`;

  return {
    amzDate: canonicalHeaders.date ? undefined : amzDate,
    authorizationHeader,
    canonicalQuerystring: createRequestOptions.canonicalQuerystring
  };
}

module.exports = generateAwsSignatureV4Headers;
