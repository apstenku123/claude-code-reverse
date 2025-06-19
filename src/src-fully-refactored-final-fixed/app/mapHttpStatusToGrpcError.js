/**
 * Maps an HTTP status code to a corresponding gRPC error object.
 *
 * @param {number} httpStatusCode - The HTTP status code received from a response.
 * @returns {{code: number, details: string, metadata: HN.Metadata}} An object containing the mapped gRPC status code, details message, and metadata.
 */
function mapHttpStatusToGrpcError(httpStatusCode) {
  // Create a descriptive details message for the error
  const detailsMessage = `Received HTTP status code ${httpStatusCode}`;
  let grpcStatusCode;

  // Map HTTP status codes to gRPC status codes
  switch (httpStatusCode) {
    case 400:
      grpcStatusCode = H8.Status.INTERNAL;
      break;
    case 401:
      grpcStatusCode = H8.Status.UNAUTHENTICATED;
      break;
    case 403:
      grpcStatusCode = H8.Status.PERMISSION_DENIED;
      break;
    case 404:
      grpcStatusCode = H8.Status.UNIMPLEMENTED;
      break;
    case 429:
    case 502:
    case 503:
    case 504:
      grpcStatusCode = H8.Status.UNAVAILABLE;
      break;
    default:
      grpcStatusCode = H8.Status.UNKNOWN;
  }

  // Return the mapped error object with metadata
  return {
    code: grpcStatusCode,
    details: detailsMessage,
    metadata: new HN.Metadata()
  };
}

module.exports = mapHttpStatusToGrpcError;