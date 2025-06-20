/**
 * Returns a standardized error object indicating that a requested server method is not implemented.
 *
 * @param {string} methodName - The name of the method that is not implemented on the server.
 * @returns {{ code: number, details: string }} An error object containing the UNIMPLEMENTED status code and a descriptive message.
 */
function createUnimplementedMethodError(methodName) {
  return {
    code: LQ.Status.UNIMPLEMENTED, // Standard gRPC status code for unimplemented methods
    details: `The server does not implement the method ${methodName}` // Descriptive error message
  };
}

module.exports = createUnimplementedMethodError;