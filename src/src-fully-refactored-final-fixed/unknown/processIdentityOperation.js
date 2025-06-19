/**
 * Processes an identity-related operation and returns the result(createInteractionAccessor) in an array.
 * Depending on the operation type, isBlobOrFileLikeObject delegates processing to the appropriate handler.
 *
 * @param {Object} operationRequest - The request object containing the operation type and related data.
 * @param {string} operationRequest.operation - The type of identity operation to process.
 * @returns {Array<any>} An array containing the result(createInteractionAccessor) of the processed operation.
 */
function processIdentityOperation(operationRequest) {
  const results = [];

  // Handle operation based on its type
  switch (operationRequest.operation) {
    case "GetCredentialsForIdentity":
    case "GetId":
    case "GetOpenIdToken":
    case "UnlinkIdentity":
      // For these operations, use the UJ1 handler
      results.push(UJ1(operationRequest));
      break;
    default:
      // For all other operations, use the createSigV4CognitoIdentityAuthScheme handler
      results.push(createSigV4CognitoIdentityAuthScheme(operationRequest));
  }

  return results;
}

module.exports = processIdentityOperation;