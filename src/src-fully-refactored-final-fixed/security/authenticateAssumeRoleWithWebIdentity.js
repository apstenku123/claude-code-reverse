/**
 * Authenticates a request based on the provided operation type, specifically handling 'AssumeRoleWithWebIdentity'.
 * Delegates processing to the appropriate handler function and collects the result(createInteractionAccessor) in an array.
 *
 * @param {Object} request - The request object containing operation details and associated data.
 * @param {string} request.operation - The operation type to be authenticated (e.g., 'AssumeRoleWithWebIdentity').
 * @returns {Array} An array containing the result(createInteractionAccessor) from the appropriate authentication handler.
 */
function authenticateAssumeRoleWithWebIdentity(request) {
  const authenticationResults = [];

  switch (request.operation) {
    case "AssumeRoleWithWebIdentity": {
      // Handle authentication for AssumeRoleWithWebIdentity operation
      authenticationResults.push(dz4(request));
      break;
    }
    default: {
      // Handle all other operations with the default authentication handler
      authenticationResults.push(createSigV4StsSigningScheme(request));
      break;
    }
  }

  return authenticationResults;
}

module.exports = authenticateAssumeRoleWithWebIdentity;