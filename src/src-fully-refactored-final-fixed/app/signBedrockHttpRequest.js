/**
 * Signs an HTTP request for AWS Bedrock using Signature V4.
 *
 * @param {Object} createRequestOptions - The HTTP request options to sign.
 * @param {string} createRequestOptions.method - The HTTP method (e.g., 'GET', 'POST').
 * @param {Object} [createRequestOptions.headers] - The HTTP headers as an object or iterable.
 * @param {string|Buffer|Uint8Array} [createRequestOptions.body] - The HTTP request body.
 *
 * @param {Object} awsConfig - AWS configuration for signing.
 * @param {string} awsConfig.url - The full request URL.
 * @param {string} awsConfig.regionName - AWS region name (e.g., 'us-east-1').
 * @param {string} [awsConfig.awsAccessKey] - Optional AWS access key to set in environment.
 * @param {string} [awsConfig.awsSecretKey] - Optional AWS secret key to set in environment.
 * @param {string} [awsConfig.awsSessionToken] - Optional AWS session token to set in environment.
 *
 * @returns {Promise<Object>} The signed HTTP headers.
 */
async function signBedrockHttpRequest(createRequestOptions, awsConfig) {
  // Ensure the request method is set
  lv6(createRequestOptions.method, "Expected request method property to be set");

  // Get default AWS credentials provider chain
  const credentialsProvider = A62.fromNodeProviderChain();

  // Optionally set AWS credentials in environment variables, then resolve credentials
  const credentials = await isResourceLockedOrNotFound(
    () => {
      if (awsConfig.awsAccessKey) {
        process.env.AWS_ACCESS_KEY_ID = awsConfig.awsAccessKey;
      }
      if (awsConfig.awsSecretKey) {
        process.env.AWS_SECRET_ACCESS_KEY = awsConfig.awsSecretKey;
      }
      if (awsConfig.awsSessionToken) {
        process.env.AWS_SESSION_TOKEN = awsConfig.awsSessionToken;
      }
    },
    () => credentialsProvider()
  );

  // Create a SignatureV4 signer for Bedrock
  const signer = new e42.SignatureV4({
    service: "bedrock",
    region: awsConfig.regionName,
    credentials: credentials,
    sha256: Q62.Sha256
  });

  // Parse the target URL
  const url = new URL(awsConfig.url);

  // Normalize headers: support both iterable and plain object
  let normalizedHeaders;
  if (!createRequestOptions.headers) {
    normalizedHeaders = {};
  } else if (Symbol.iterator in createRequestOptions.headers) {
    // Convert iterable headers (e.g., Map) to plain object
    normalizedHeaders = Object.fromEntries(
      Array.from(createRequestOptions.headers).map(([key, value]) => [key, value])
    );
  } else {
    // Assume headers is a plain object
    normalizedHeaders = { ...createRequestOptions.headers };
  }

  // Remove 'connection' header and set 'host' header to match the URL
  delete normalizedHeaders.connection;
  normalizedHeaders.host = url.hostname;

  // Construct the HTTP request object for signing
  const httpRequest = new B62.HttpRequest({
    method: createRequestOptions.method.toUpperCase(),
    protocol: url.protocol,
    path: url.pathname,
    headers: normalizedHeaders,
    body: createRequestOptions.body
  });

  // Sign the request and return the signed headers
  const signedRequest = await signer.sign(httpRequest);
  return signedRequest.headers;
}

module.exports = signBedrockHttpRequest;
