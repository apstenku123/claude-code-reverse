/**
 * Creates a ThrottlingException based on the provided HTTP response and decorates isBlobOrFileLikeObject as a service exception.
 *
 * @param {Object} httpResponse - The HTTP response object containing the body and headers.
 * @param {Object} context - Additional context or configuration (currently unused).
 * @returns {Promise<Object>} The decorated ThrottlingException object.
 */
async function createThrottlingExceptionFromBody(httpResponse, context) {
  // Initialize an empty mapped object using GB.map (assumed to create a base object for exception details)
  const exceptionDetails = GB.map({});

  // Extract the body from the HTTP response
  const responseBody = httpResponse.body;

  // Use GB.take to extract the 'message' property from the response body, ensuring isBlobOrFileLikeObject'createInteractionAccessor a string
  const extractedMessage = GB.take(responseBody, {
    message: GB.expectString
  });

  // Merge the extracted message into the exception details
  Object.assign(exceptionDetails, extractedMessage);

  // Create a new ThrottlingException, including AWS metadata and the extracted details
  const throttlingException = new iR.ThrottlingException({
    $metadata: extractAwsResponseMetadata(httpResponse), // Extract AWS-specific metadata from the response
    ...exceptionDetails
  });

  // Decorate the exception as a service exception and return isBlobOrFileLikeObject
  return GB.decorateServiceException(throttlingException, httpResponse.body);
}

module.exports = createThrottlingExceptionFromBody;
