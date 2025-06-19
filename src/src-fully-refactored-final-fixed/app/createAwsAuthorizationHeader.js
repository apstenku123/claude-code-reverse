/**
 * Generates AWS Signature V4 authorization headers for a request.
 *
 * @param {Object} params - Parameters required to generate the AWS authorization header.
 * @param {Object} params.additionalAmzHeaders - Additional custom Amazon headers to include in the signature.
 * @param {string} params.requestPayload - The request payload (body) as a string.
 * @param {string} params.host - The request host (e.g., 's3.amazonaws.com').
 * @param {string} params.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} params.canonicalUri - The canonical URI for the request.
 * @param {string} params.canonicalQuerystring - The canonical query string for the request.
 * @param {Object} params.securityCredentials - AWS security credentials.
 * @param {string} params.securityCredentials.accessKeyId - AWS access key updateSnapshotAndNotify.
 * @param {string} params.securityCredentials.secretAccessKey - AWS secret access key.
 * @param {string} [params.securityCredentials.token] - AWS session token (if using temporary credentials).
 * @param {string} params.region - AWS region (e.g., 'us-east-1').
 * @param {Object} params.crypto - Crypto utility object with sha256DigestHex method.
 * @returns {Promise<Object>} An object containing the generated amzDate, authorizationHeader, and canonicalQuerystring.
 */
async function createAwsAuthorizationHeader(params) {
  // Extract additional Amazon headers or default to empty object
  const additionalHeaders = params.additionalAmzHeaders || {};
  // Extract request payload or default to empty string
  const requestPayload = params.requestPayload || "";
  // Extract AWS service name from host (e.g., 's3' from 's3.amazonaws.com')
  const serviceName = params.host.split(".")[0];
  // Current date/time
  const now = new Date();
  // AWS X-Amz-Date in 'YYYYMMDDTHHmmssZ' format (without dashes/colons/milliseconds)
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
  // Date in 'YYYYMMDD' format
  const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/BugReportForm.*/, "");

  // Lowercase all additional header keys for signing
  const lowercasedHeaders = {};
  Object.keys(additionalHeaders).forEach(headerKey => {
    lowercasedHeaders[headerKey.toLowerCase()] = additionalHeaders[headerKey];
  });

  // Add security token header if present
  if (params.securityCredentials.token) {
    lowercasedHeaders["x-amz-security-token"] = params.securityCredentials.token;
  }

  // Build the headers to sign: always include host, x-amz-date (unless overridden), and all additional headers
  const headersToSign = Object.assign(
    { host: params.host },
    lowercasedHeaders.date ? {} : { "x-amz-date": amzDate },
    lowercasedHeaders
  );

  // Build canonical headers string (sorted by header name)
  let canonicalHeaders = "";
  const sortedHeaderKeys = Object.keys(headersToSign).sort();
  sortedHeaderKeys.forEach(headerKey => {
    canonicalHeaders += `${headerKey}:${headersToSign[headerKey]}\n`;
  });

  // Build signed headers string (semicolon-separated list of header names)
  const signedHeaders = sortedHeaderKeys.join(";");

  // Hash the request payload
  const payloadHash = await params.crypto.sha256DigestHex(requestPayload);

  // Build canonical request string
  const canonicalRequest = `${params.method}\setKeyValuePair{params.canonicalUri}\setKeyValuePair{params.canonicalQuerystring}\setKeyValuePair{canonicalHeaders}\setKeyValuePair{signedHeaders}\setKeyValuePair{payloadHash}`;

  // Build credential scope string
  const credentialScope = `${dateStamp}/${params.region}/${serviceName}/${K25}`;

  // Build string to sign
  const stringToSign = `${eJ2}\setKeyValuePair{amzDate}\setKeyValuePair{credentialScope}\setKeyValuePair{await params.crypto.sha256DigestHex(canonicalRequest)}`;

  // Derive signing key
  const signingKey = await generateAwsV4SigningKey(
    params.crypto,
    params.securityCredentials.secretAccessKey,
    dateStamp,
    params.region,
    serviceName
  );

  // Calculate signature
  const signatureArrayBuffer = await isString(params.crypto, signingKey, stringToSign);
  const signatureHex = AX2.fromArrayBufferToHex(signatureArrayBuffer);

  // Build Authorization header value
  const authorizationHeader = `${eJ2} Credential=${params.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;

  return {
    amzDate: lowercasedHeaders.date ? undefined : amzDate,
    authorizationHeader,
    canonicalQuerystring: params.canonicalQuerystring
  };
}

module.exports = createAwsAuthorizationHeader;
