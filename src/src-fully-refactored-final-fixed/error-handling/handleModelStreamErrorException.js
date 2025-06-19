/**
 * Handles a ModelStream error response by extracting relevant information from the HTTP response body,
 * constructing a ModelStreamErrorException, and decorating isBlobOrFileLikeObject as a service exception.
 *
 * @async
 * @param {object} httpResponse - The HTTP response object containing the error body and metadata.
 * @param {object} context - Additional context or configuration (currently unused).
 * @returns {Promise<object>} The decorated ModelStreamErrorException instance.
 */
async function handleModelStreamErrorException(httpResponse, context) {
  // Initialize an empty mapped object using GB.map
  const mappedError = GB.map({});

  // Extract the response body
  const responseBody = httpResponse.body;

  // Extract expected error fields from the response body
  const extractedErrorFields = GB.take(responseBody, {
    message: GB.expectString,
    originalMessage: GB.expectString,
    originalStatusCode: GB.expectInt32
  });

  // Merge the extracted fields into the mapped error object
  Object.assign(mappedError, extractedErrorFields);

  // Construct the ModelStreamErrorException with AWS metadata and error details
  const modelStreamErrorException = new iR.ModelStreamErrorException({
    $metadata: extractAwsResponseMetadata(httpResponse),
    ...mappedError
  });

  // Decorate the exception as a service exception and return isBlobOrFileLikeObject
  return GB.decorateServiceException(modelStreamErrorException, httpResponse.body);
}

module.exports = handleModelStreamErrorException;
