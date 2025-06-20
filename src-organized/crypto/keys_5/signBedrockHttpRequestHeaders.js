/**
 * Signs an HTTP request for AWS Bedrock service using Signature V4 and returns the signed headers.
 *
 * @async
 * @function signBedrockHttpRequestHeaders
 * @param {Object} request - The HTTP request object. Must include a 'method' property, and may include 'headers' and 'body'.
 * @param {Object} config - Configuration for signing. Includes AWS credentials (awsAccessKey, awsSecretKey, awsSessionToken), regionName, and the request URL.
 * @returns {Promise<Object>} The signed HTTP headers for the request.
 */
async function signBedrockHttpRequestHeaders(request, config) {
  // Ensure the request method is set
  lv6(request.method, "Expected request method property to be set");

  // Create a credentials provider chain
  const credentialsProvider = A62.fromNodeProviderChain();

  // Set AWS credentials in environment variables if provided in config
  const credentials = await isResourceLockedOrNotFound(
    () => {
      if (config.awsAccessKey) process.env.AWS_ACCESS_KEY_ID = config.awsAccessKey;
      if (config.awsSecretKey) process.env.AWS_SECRET_ACCESS_KEY = config.awsSecretKey;
      if (config.awsSessionToken) process.env.AWS_SESSION_TOKEN = config.awsSessionToken;
    },
    () => credentialsProvider()
  );

  // Create a SignatureV4 signer for the Bedrock service
  const signer = new e42.SignatureV4({
    service: "bedrock",
    region: config.regionName,
    credentials: credentials,
    sha256: Q62.Sha256
  });

  // Parse the request URL
  const url = new URL(config.url);

  // Normalize headers: convert Headers iterable or clone plain object
  let normalizedHeaders;
  if (!request.headers) {
    normalizedHeaders = {};
  } else if (Symbol.iterator in request.headers) {
    // If headers is iterable (e.g., Headers instance), convert to plain object
    normalizedHeaders = Object.fromEntries(Array.from(request.headers).map(([key, value]) => [key, value]));
  } else {
    // Otherwise, shallow clone the headers object
    normalizedHeaders = { ...request.headers };
  }

  // Remove 'connection' header and set 'host' header to match the URL hostname
  delete normalizedHeaders.connection;
  normalizedHeaders.host = url.hostname;

  // Construct the HTTP request object for signing
  const httpRequest = new B62.HttpRequest({
    method: request.method.toUpperCase(),
    protocol: url.protocol,
    path: url.pathname,
    headers: normalizedHeaders,
    body: request.body
  });

  // Sign the request and return the signed headers
  const signedRequest = await signer.sign(httpRequest);
  return signedRequest.headers;
}

module.exports = signBedrockHttpRequestHeaders;