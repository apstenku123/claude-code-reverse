/**
 * Handles AWS SSO operations by dispatching the request to the appropriate handler based on the operation type.
 *
 * @param {Object} operationRequest - The request object containing the operation type and its parameters.
 * @param {string} operationRequest.operation - The type of SSO operation to perform (e.g., 'GetRoleCredentials', 'ListAccountRoles', 'ListAccounts', 'Logout').
 * @returns {Array<any>} An array containing the result(createInteractionAccessor) of the operation handler.
 */
function handleSsoOperation(operationRequest) {
  const operationResults = [];

  // Determine which handler to use based on the operation type
  switch (operationRequest.operation) {
    case "GetRoleCredentials":
    case "ListAccountRoles":
    case "ListAccounts":
    case "Logout":
      // For these operations, use the b31 handler
      operationResults.push(b31(operationRequest));
      break;
    default:
      // For any other operation, use the createAwsSigV4AuthScheme handler
      operationResults.push(createAwsSigV4AuthScheme(operationRequest));
  }

  return operationResults;
}

module.exports = handleSsoOperation;