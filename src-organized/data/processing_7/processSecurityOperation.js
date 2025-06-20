/**
 * Processes a security operation and delegates to the appropriate handler based on the operation type.
 *
 * @param {Object} operationRequest - The security operation request object.
 * @param {string} operationRequest.operation - The type of security operation to process.
 * @returns {Array} An array containing the result(createInteractionAccessor) of the processed operation.
 */
function processSecurityOperation(operationRequest) {
  const processedResults = [];

  switch (operationRequest.operation) {
    case "AssumeRoleWithWebIdentity":
      // Handle AssumeRoleWithWebIdentity operation using dz4 handler
      processedResults.push(dz4(operationRequest));
      break;
    default:
      // Handle all other operations using createSigV4StsSigningScheme handler
      processedResults.push(createSigV4StsSigningScheme(operationRequest));
      break;
  }

  return processedResults;
}

module.exports = processSecurityOperation;