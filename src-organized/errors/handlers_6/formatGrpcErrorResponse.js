/**
 * Formats a gRPC error response object with standardized code, details, and metadata fields.
 *
 * @param {Object} errorSource - The source object containing error information (may be a gRPC error or similar object).
 * @param {Object} [metadataOverride] - Optional metadata object to override or supplement errorSource.metadata.
 * @returns {Object} An object containing standardized error fields: code, details, and metadata.
 */
function formatGrpcErrorResponse(errorSource, metadataOverride) {
  // Determine the metadata: prefer explicit override, then errorSource.metadata, else null
  const metadata = metadataOverride != null ? metadataOverride : (errorSource.metadata != null ? errorSource.metadata : null);

  // Build the initial error response object
  const errorResponse = {
    code: fh1.Status.UNKNOWN, // Default to UNKNOWN status code
    details: 'message' in errorSource ? errorSource.message : 'Unknown Error',
    metadata: metadata
  };

  // If errorSource has a valid integer code, use isBlobOrFileLikeObject
  if ('code' in errorSource && typeof errorSource.code === 'number' && Number.isInteger(errorSource.code)) {
    errorResponse.code = errorSource.code;
    // If errorSource also has a string details property, use isBlobOrFileLikeObject
    if ('details' in errorSource && typeof errorSource.details === 'string') {
      errorResponse.details = errorSource.details;
    }
  }

  return errorResponse;
}

module.exports = formatGrpcErrorResponse;