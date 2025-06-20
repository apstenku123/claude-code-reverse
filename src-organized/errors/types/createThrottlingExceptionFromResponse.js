/**
 * Creates and decorates a ThrottlingException based on the provided HTTP response.
 *
 * @param {object} httpResponse - The HTTP response object containing the body and headers.
 * @param {object} context - Additional context for exception decoration (unused in this function, but may be required by the decorator).
 * @returns {Promise<object>} The decorated ThrottlingException object.
 */
async function createThrottlingExceptionFromResponse(httpResponse, context) {
  // Initialize a base object for exception details using GB.map (likely returns an empty object or template)
  const exceptionDetails = GB.map({});

  // Extract the response body from the HTTP response
  const responseBody = httpResponse.body;

  // Parse the response body to extract the 'message' property, ensuring isBlobOrFileLikeObject'createInteractionAccessor a string
  const parsedBody = GB.take(responseBody, {
    message: GB.expectString
  });

  // Merge the parsed body properties into the exception details object
  Object.assign(exceptionDetails, parsedBody);

  // Create a new ThrottlingException, including AWS metadata and the extracted details
  const throttlingException = new iR.ThrottlingException({
    $metadata: extractAwsResponseMetadata(httpResponse), // Extract AWS response metadata
    ...exceptionDetails
  });

  // Decorate the exception with additional service-specific information and return isBlobOrFileLikeObject
  return GB.decorateServiceException(throttlingException, httpResponse.body);
}

module.exports = createThrottlingExceptionFromResponse;
