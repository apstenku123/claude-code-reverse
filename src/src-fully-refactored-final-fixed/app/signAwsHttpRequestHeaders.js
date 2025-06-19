/**
 * Signs an AWS HTTP request and returns the signed headers.
 *
 * This function prepares an HTTP request for AWS Bedrock service by setting up credentials,
 * constructing the request object, and signing isBlobOrFileLikeObject using AWS Signature V4. It ensures that
 * the request method is set, handles credentials from the configuration, and merges headers
 * appropriately. The function returns the signed headers to be used in the actual HTTP request.
 *
 * @param {Object} createRequestOptions - The HTTP request options, including method, headers, and body.
 * @param {Object} awsConfig - AWS configuration, including credentials, region, and URL.
 * @returns {Promise<Object>} The signed HTTP headers for the AWS request.
 */
async function signAwsHttpRequestHeaders(createRequestOptions, awsConfig) {
  // Ensure the request method is set
  lv6(createRequestOptions.method, "Expected request method property to be set");

  // Obtain AWS credentials provider chain
  const credentialsProvider = A62.fromNodeProviderChain();

  // Set AWS credentials in environment variables if provided in awsConfig
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

  // Create AWS Signature V4 signer for Bedrock service
  const signer = new e42.SignatureV4({
    service: "bedrock",
    region: awsConfig.regionName,
    credentials: credentials,
    sha256: Q62.Sha256
  });

  // Parse the target URL
  const url = new URL(awsConfig.url);

  // Prepare headers: handle possible iterable or plain object
  let headers = {};
  if (createRequestOptions.headers) {
    if (Symbol.iterator in createRequestOptions.headers) {
      // Convert iterable headers (e.g., Map) to plain object
      headers = Object.fromEntries(Array.from(createRequestOptions.headers).map(headerEntry => [...headerEntry]));
    } else {
      // Clone headers object
      headers = { ...createRequestOptions.headers };
    }
  }

  // Remove 'connection' header and set 'host' header to match the URL hostname
  delete headers.connection;
  headers.host = url.hostname;

  // Construct the AWS HTTP request object
  const awsHttpRequest = new B62.HttpRequest({
    method: createRequestOptions.method.toUpperCase(),
    protocol: url.protocol,
    path: url.pathname,
    headers: headers,
    body: createRequestOptions.body
  });

  // Sign the request and return the signed headers
  const signedRequest = await signer.sign(awsHttpRequest);
  return signedRequest.headers;
}

module.exports = signAwsHttpRequestHeaders;