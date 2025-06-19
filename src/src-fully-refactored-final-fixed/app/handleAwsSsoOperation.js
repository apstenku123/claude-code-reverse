/**
 * Handles AWS SSO operations by dispatching the request to the appropriate handler based on the operation type.
 *
 * @param {Object} operationRequest - The request object containing the operation type and related data.
 * @param {string} operationRequest.operation - The type of AWS SSO operation to perform.
 * @returns {Array<any>} An array containing the result(createInteractionAccessor) of the operation handler.
 */
function handleAwsSsoOperation(operationRequest) {
  const operationResults = [];

  // Determine which handler to use based on the operation type
  switch (operationRequest.operation) {
    case "GetRoleCredentials":
      // Handle fetching role credentials
      operationResults.push(b31(operationRequest));
      break;
    case "ListAccountRoles":
      // Handle listing account roles
      operationResults.push(b31(operationRequest));
      break;
    case "ListAccounts":
      // Handle listing accounts
      operationResults.push(b31(operationRequest));
      break;
    case "Logout":
      // Handle logout operation
      operationResults.push(b31(operationRequest));
      break;
    default:
      // For unknown operations, use the fallback handler
      operationResults.push(createAwsSigV4AuthScheme(operationRequest));
  }

  return operationResults;
}

module.exports = handleAwsSsoOperation;