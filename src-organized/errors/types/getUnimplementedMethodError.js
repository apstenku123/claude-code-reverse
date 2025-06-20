/**
 * Returns an error object indicating that the requested server method is not implemented.
 *
 * @param {string} methodName - The name of the method that is not implemented on the server.
 * @returns {{code: number, details: string}} An error object with status code and details message.
 */
function getUnimplementedMethodError(methodName) {
  return {
    code: LQ.Status.UNIMPLEMENTED, // Standard status code for unimplemented methods
    details: `The server does not implement the method ${methodName}` // Informative error message
  };
}

module.exports = getUnimplementedMethodError;