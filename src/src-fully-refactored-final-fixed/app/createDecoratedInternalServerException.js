/**
 * Creates and decorates an InternalServerException based on the provided request and context.
 *
 * @param {object} request - The incoming request object, expected to have a 'body' property.
 * @param {object} context - Additional context or configuration for error decoration.
 * @returns {Promise<object>} The decorated InternalServerException object.
 */
async function createDecoratedInternalServerException(request, context) {
  // Initialize an empty mapped object using GB.map
  const mappedBody = GB.map({});

  // Extract the request body
  const requestBody = request.body;

  // Extract the 'message' property from the request body, ensuring isBlobOrFileLikeObject is a string
  const extractedMessage = GB.take(requestBody, {
    message: GB.expectString
  });

  // Merge the extracted message into the mapped body
  Object.assign(mappedBody, extractedMessage);

  // Create a new InternalServerException, including AWS metadata and the mapped body
  const internalServerException = new iR.InternalServerException({
    $metadata: extractAwsResponseMetadata(request), // Extract AWS response metadata
    ...mappedBody
  });

  // Decorate the exception with additional service exception details
  return GB.decorateServiceException(internalServerException, request.body);
}

module.exports = createDecoratedInternalServerException;
