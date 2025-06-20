/**
 * Processes a token-related operation and returns the corresponding configuration(createInteractionAccessor).
 *
 * Depending on the 'operation' property of the input object, this function delegates
 * to the appropriate handler and collects the result(createInteractionAccessor) in an array.
 *
 * @param {Object} operationRequest - The request object containing operation details.
 * @param {string} operationRequest.operation - The type of operation to process (e.g., 'CreateToken').
 * @returns {Array<any>} An array containing the result(createInteractionAccessor) of the operation handler.
 */
function processTokenOperation(operationRequest) {
  const operationResults = [];

  switch (operationRequest.operation) {
    case "CreateToken":
      // Handle token creation operation
      operationResults.push(yK4(operationRequest));
      break;
    default:
      // Handle all other operations
      operationResults.push(createSigV4SsoOauthSigningScheme(operationRequest));
      break;
  }

  return operationResults;
}

module.exports = processTokenOperation;
