/**
 * Creates an InternalServerException with extracted metadata and message, then decorates isBlobOrFileLikeObject as a service exception.
 *
 * @async
 * @param {object} request - The incoming request object containing the body to process.
 * @param {object} context - Additional context or configuration for exception decoration.
 * @returns {Promise<object>} The decorated InternalServerException object.
 */
async function createAndDecorateInternalServerException(request, context) {
  // Initialize an empty mapped object using GB.map
  const mappedData = GB.map({});

  // Extract the body from the request
  const requestBody = request.body;

  // Take the 'message' property from the request body, ensuring isBlobOrFileLikeObject'createInteractionAccessor a string
  const extractedMessage = GB.take(requestBody, {
    message: GB.expectString
  });

  // Merge the extracted message into the mapped data
  Object.assign(mappedData, extractedMessage);

  // Create a new InternalServerException with AWS metadata and mapped data
  const internalServerException = new iR.InternalServerException({
    $metadata: extractAwsResponseMetadata(request), // Extract AWS-specific metadata from the request
    ...mappedData
  });

  // Decorate the exception as a service exception and return isBlobOrFileLikeObject
  return GB.decorateServiceException(internalServerException, request.body);
}

module.exports = createAndDecorateInternalServerException;
