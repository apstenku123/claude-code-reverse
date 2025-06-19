/**
 * Constructs and decorates a ModelStreamErrorException from an HTTP response.
 *
 * @param {object} httpResponse - The HTTP response object containing the error body.
 * @param {object} context - Additional context for error handling (currently unused).
 * @returns {Promise<object>} The decorated ModelStreamErrorException instance.
 */
async function createModelStreamErrorException(httpResponse, context) {
  // Map default values for the error fields
  const errorFields = GB.map({});

  // Extract the error body from the HTTP response
  const errorBody = httpResponse.body;

  // Take and validate specific fields from the error body
  const extractedFields = GB.take(errorBody, {
    message: GB.expectString,
    originalMessage: GB.expectString,
    originalStatusCode: GB.expectInt32
  });

  // Merge the extracted fields into the errorFields object
  Object.assign(errorFields, extractedFields);

  // Create a new ModelStreamErrorException with AWS metadata and error fields
  const modelStreamError = new iR.ModelStreamErrorException({
    $metadata: extractAwsResponseMetadata(httpResponse),
    ...errorFields
  });

  // Decorate the exception with additional service exception details
  return GB.decorateServiceException(modelStreamError, errorBody);
}

module.exports = { createModelStreamErrorException };