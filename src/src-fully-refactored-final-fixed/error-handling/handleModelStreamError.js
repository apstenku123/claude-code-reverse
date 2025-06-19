/**
 * Handles a ModelStream error by extracting relevant error information from the response body,
 * constructing a ModelStreamErrorException, and decorating isBlobOrFileLikeObject as a service exception.
 *
 * @param {object} httpResponse - The HTTP response object containing the error body and metadata.
 * @param {object} context - Additional context for error handling (currently unused).
 * @returns {Promise<object>} - The decorated ModelStreamErrorException instance.
 */
async function handleModelStreamError(httpResponse, context) {
  // Initialize an empty error details object using GB.map
  const errorDetails = GB.map({});

  // Extract the response body
  const responseBody = httpResponse.body;

  // Extract expected error fields from the response body
  const extractedErrorFields = GB.take(responseBody, {
    message: GB.expectString,
    originalMessage: GB.expectString,
    originalStatusCode: GB.expectInt32
  });

  // Merge the extracted error fields into errorDetails
  Object.assign(errorDetails, extractedErrorFields);

  // Create a new ModelStreamErrorException with AWS metadata and error details
  const modelStreamError = new iR.ModelStreamErrorException({
    $metadata: extractAwsResponseMetadata(httpResponse),
    ...errorDetails
  });

  // Decorate and return the service exception
  return GB.decorateServiceException(modelStreamError, responseBody);
}

module.exports = handleModelStreamError;