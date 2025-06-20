/**
 * Checks if the provided gRPC header name represents a binary header.
 * In gRPC, binary headers are suffixed with '-bin'.
 *
 * @param {string} headerName - The name of the gRPC header to check.
 * @returns {boolean} True if the header name ends with '-bin', indicating a binary header; otherwise, false.
 */
function isBinaryGrpcHeader(headerName) {
  // gRPC binary headers conventionally end with '-bin'
  return headerName.endsWith('-bin');
}

module.exports = isBinaryGrpcHeader;