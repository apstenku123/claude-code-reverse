/**
 * Checks if the provided header name does NOT start with the 'grpc-' prefix.
 *
 * @param {string} headerName - The name of the header to check.
 * @returns {boolean} Returns true if the header name does NOT start with 'grpc-', otherwise false.
 */
function isNotGrpcHeader(headerName) {
  // The startsWith method checks if the string begins with 'grpc-'.
  // The logical NOT operator (!) inverts the result.
  return !headerName.startsWith("grpc-");
}

module.exports = isNotGrpcHeader;