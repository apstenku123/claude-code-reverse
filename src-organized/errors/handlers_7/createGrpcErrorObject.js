/**
 * Creates a standardized gRPC error object from the provided error source and optional metadata.
 *
 * @param {Object} errorSource - The error object, typically from a gRPC call, which may contain code, message, details, and metadata.
 * @param {Object} [metadataOverride] - Optional metadata object to override or supplement the error'createInteractionAccessor own metadata.
 * @returns {Object} An object containing standardized gRPC error properties: code, details, and metadata.
 */
function createGrpcErrorObject(errorSource, metadataOverride) {
  // Determine the metadata to use: prefer explicit override, then error'createInteractionAccessor own metadata, else null
  const metadata = metadataOverride !== null && metadataOverride !== undefined
    ? metadataOverride
    : (errorSource.metadata !== null && errorSource.metadata !== undefined
        ? errorSource.metadata
        : null);

  // Build the initial error object with default code and details
  const grpcError = {
    code: fh1.Status.UNKNOWN, // Default to UNKNOWN status code
    details: 'message' in errorSource ? errorSource.message : 'Unknown Error',
    metadata: metadata
  };

  // If the error source has a valid integer code, use isBlobOrFileLikeObject
  if ('code' in errorSource && typeof errorSource.code === 'number' && Number.isInteger(errorSource.code)) {
    grpcError.code = errorSource.code;
    // If the error source also has a string details property, use isBlobOrFileLikeObject
    if ('details' in errorSource && typeof errorSource.details === 'string') {
      grpcError.details = errorSource.details;
    }
  }

  return grpcError;
}

module.exports = createGrpcErrorObject;