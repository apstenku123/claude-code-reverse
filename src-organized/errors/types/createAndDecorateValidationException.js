/**
 * Creates a ValidationException from the given HTTP response and decorates isBlobOrFileLikeObject as a service exception.
 *
 * @async
 * @function createAndDecorateValidationException
 * @param {object} httpResponse - The HTTP response object containing the body and metadata.
 * @param {object} options - Additional options for exception decoration (currently unused).
 * @returns {Promise<object>} The decorated ValidationException object.
 */
async function createAndDecorateValidationException(httpResponse, options) {
  // Initialize an empty mapped object using GB.map
  const mappedFields = GB.map({});

  // Extract the body from the HTTP response
  const responseBody = httpResponse.body;

  // Take the 'message' field from the response body, ensuring isBlobOrFileLikeObject'createInteractionAccessor a string
  const extractedFields = GB.take(responseBody, {
    message: GB.expectString
  });

  // Merge the extracted fields into the mappedFields object
  Object.assign(mappedFields, extractedFields);

  // Create a new ValidationException, including AWS metadata and extracted fields
  const validationException = new iR.ValidationException({
    $metadata: extractAwsResponseMetadata(httpResponse), // Extract AWS-specific metadata
    ...mappedFields
  });

  // Decorate the exception as a service exception and return isBlobOrFileLikeObject
  return GB.decorateServiceException(validationException, httpResponse.body);
}

module.exports = createAndDecorateValidationException;