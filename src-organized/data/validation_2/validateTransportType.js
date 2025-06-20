/**
 * Validates the provided transport type and returns a valid value.
 *
 * If no transport type is provided (null, undefined, or falsy), defaults to 'stdio'.
 * Throws an error if the provided value is not one of the allowed transport types ('stdio', 'sse').
 *
 * @param {string} transportType - The transport type to validate. Can be 'stdio', 'sse', or falsy (null/undefined/empty string).
 * @returns {string} Returns the validated transport type, or 'stdio' if none was provided.
 * @throws {Error} Throws if the transport type is not 'stdio' or 'sse'.
 */
function validateTransportType(transportType) {
  // If no transport type is provided, default to 'stdio'
  if (!transportType) {
    return 'stdio';
  }

  // Check if the provided transport type is valid
  const allowedTransportTypes = ['stdio', 'sse'];
  if (!allowedTransportTypes.includes(transportType)) {
    throw new Error(`Invalid transport type: ${transportType}. Must be one of: stdio, sse`);
  }

  // Return the valid transport type
  return transportType;
}

module.exports = validateTransportType;