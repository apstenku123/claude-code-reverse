/**
 * Processes an HTTP request object, transforms its body asynchronously, and generates a throttling exception if necessary.
 *
 * @async
 * @function handleThrottlingExceptionFromRequest
 * @param {Object} createRequestOptions - The original HTTP request options, including headers and body.
 * @param {Object} awsMetadata - AWS-specific metadata required for exception creation.
 * @returns {Promise<Error>} Returns a Promise that resolves to a ThrottlingException object decorated with relevant information.
 */
async function handleThrottlingExceptionFromRequest(createRequestOptions, awsMetadata) {
  // Clone the request options and asynchronously transform the body
  const transformedRequestOptions = {
    ...createRequestOptions,
    body: await mt(createRequestOptions.body, awsMetadata)
  };

  // Create and return a throttling exception based on the transformed request and AWS metadata
  return createThrottlingExceptionFromBody(transformedRequestOptions, awsMetadata);
}

module.exports = handleThrottlingExceptionFromRequest;