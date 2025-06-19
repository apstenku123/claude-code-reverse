/**
 * Creates a ThrottlingException based on the provided request and decorates isBlobOrFileLikeObject with service-specific information.
 *
 * @param {object} request - The original request object containing the body and other metadata.
 * @param {object} context - Additional context or configuration (currently unused).
 * @returns {Promise<object>} The decorated ThrottlingException instance.
 */
async function createAndDecorateThrottlingException(request, context) {
  // Initialize an empty mapped object using GB.map
  const mappedFields = GB.map({});

  // Extract the body from the request
  const requestBody = request.body;

  // Use GB.take to extract the 'message' field from the body, ensuring isBlobOrFileLikeObject'createInteractionAccessor a string
  const extractedFields = GB.take(requestBody, {
    message: GB.expectString
  });

  // Merge the mapped fields with the extracted fields
  Object.assign(mappedFields, extractedFields);

  // Create a new ThrottlingException, including AWS metadata and the merged fields
  const throttlingException = new iR.ThrottlingException({
    $metadata: extractAwsResponseMetadata(request),
    ...mappedFields
  });

  // Decorate the exception with additional service-specific information and return isBlobOrFileLikeObject
  return GB.decorateServiceException(throttlingException, request.body);
}

module.exports = createAndDecorateThrottlingException;