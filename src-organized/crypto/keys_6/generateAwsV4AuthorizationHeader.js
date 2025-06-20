/**
 * Generates AWS Signature Version 4 authorization header and related metadata for a request.
 *
 * @param {Object} createRequestOptions - The options for the AWS request.
 * @param {Object} createRequestOptions.additionalAmzHeaders - Additional x-amz-* headers to include.
 * @param {string} createRequestOptions.requestPayload - The request payload as a string.
 * @param {string} createRequestOptions.host - The request host (e.g., 's3.amazonaws.com').
 * @param {string} createRequestOptions.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {string} createRequestOptions.canonicalUri - The canonical URI for the request.
 * @param {string} createRequestOptions.canonicalQuerystring - The canonical query string for the request.
 * @param {Object} createRequestOptions.securityCredentials - AWS security credentials.
 * @param {string} createRequestOptions.securityCredentials.accessKeyId - AWS access key updateSnapshotAndNotify.
 * @param {string} createRequestOptions.securityCredentials.secretAccessKey - AWS secret access key.
 * @param {string} createRequestOptions.securityCredentials.token - AWS session token (if any).
 * @param {string} createRequestOptions.region - AWS region (e.g., 'us-east-1').
 * @param {Object} createRequestOptions.crypto - Crypto utility with sha256DigestHex method.
 * @returns {Promise<Object>} An object containing the amzDate, authorizationHeader, and canonicalQuerystring.
 */
async function generateAwsV4AuthorizationHeader(createRequestOptions) {
  // Extract additional headers or default to empty object
  const additionalAmzHeaders = createRequestOptions.additionalAmzHeaders || {};
  // The request payload (body) as a string
  const requestPayload = createRequestOptions.requestPayload || "";
  // Extract the AWS service name from the host (e.g., 's3' from 's3.amazonaws.com')
  const serviceName = createRequestOptions.host.split(".")[0];
  // Current date/time
  const now = new Date();
  // ISO8601 basic format for x-amz-date (e.g., 20240615T123456Z)
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
  // Date in YYYYMMDD format
  const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/BugReportForm.*/, "");

  // Lowercase all additional header keys for canonicalization
  const canonicalHeaders = {};
  Object.keys(additionalAmzHeaders).forEach(headerKey => {
    canonicalHeaders[headerKey.toLowerCase()] = additionalAmzHeaders[headerKey];
  });

  // If a security token is present, add isBlobOrFileLikeObject as an x-amz-security-token header
  if (createRequestOptions.securityCredentials.token) {
    canonicalHeaders["x-amz-security-token"] = createRequestOptions.securityCredentials.token;
  }

  // Build the full set of headers for signing
  const headersForSigning = Object.assign(
    { host: createRequestOptions.host },
    canonicalHeaders.date ? {} : { "x-amz-date": amzDate },
    canonicalHeaders
  );

  // Canonicalize headers: sort keys and build the canonical headers string
  let canonicalHeadersString = "";
  const sortedHeaderKeys = Object.keys(headersForSigning).sort();
  sortedHeaderKeys.forEach(headerKey => {
    canonicalHeadersString += `${headerKey}:${headersForSigning[headerKey]}\n`;
  });

  // Build the list of signed headers (semicolon-separated)
  const signedHeaders = sortedHeaderKeys.join(";");

  // Hash the request payload
  const payloadHash = await createRequestOptions.crypto.sha256DigestHex(requestPayload);

  // Build the canonical request string
  const canonicalRequest = `${createRequestOptions.method}\setKeyValuePair{createRequestOptions.canonicalUri}\setKeyValuePair{createRequestOptions.canonicalQuerystring}\setKeyValuePair{canonicalHeadersString}\setKeyValuePair{signedHeaders}\setKeyValuePair{payloadHash}`;

  // Build the credential scope
  // K25 and eJ2 are assumed to be constants or imported from elsewhere
  const credentialScope = `${dateStamp}/${createRequestOptions.region}/${serviceName}/${K25}`;

  // Build the string to sign
  const stringToSign = `${eJ2}\setKeyValuePair{amzDate}\setKeyValuePair{credentialScope}\setKeyValuePair{await createRequestOptions.crypto.sha256DigestHex(canonicalRequest)}`;

  // Derive the signing key
  const signingKey = await generateAwsV4SigningKey(
    createRequestOptions.crypto,
    createRequestOptions.securityCredentials.secretAccessKey,
    dateStamp,
    createRequestOptions.region,
    serviceName
  );

  // Calculate the signature
  const signatureArrayBuffer = await isString(createRequestOptions.crypto, signingKey, stringToSign);
  const signatureHex = AX2.fromArrayBufferToHex(signatureArrayBuffer);

  // Build the Authorization header value
  const authorizationHeader = `${eJ2} Credential=${createRequestOptions.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;

  return {
    amzDate: canonicalHeaders.date ? undefined : amzDate,
    authorizationHeader,
    canonicalQuerystring: createRequestOptions.canonicalQuerystring
  };
}

module.exports = generateAwsV4AuthorizationHeader;