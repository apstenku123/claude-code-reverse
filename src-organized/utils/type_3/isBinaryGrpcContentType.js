/**
 * Checks if the provided content type string ends with the '-bin' suffix, which is commonly used to denote binary gRPC content types.
 *
 * @param {string} contentType - The content type string to check (e.g., 'application/grpc-web+proto-bin').
 * @returns {boolean} Returns true if the content type ends with '-bin', otherwise false.
 */
function isBinaryGrpcContentType(contentType) {
  // The '-bin' suffix is used for binary gRPC content types
  return contentType.endsWith('-bin');
}

module.exports = isBinaryGrpcContentType;