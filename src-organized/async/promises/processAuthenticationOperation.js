/**
 * Processes an authentication operation and delegates to the appropriate handler based on the operation type.
 *
 * @param {Object} authenticationRequest - The authentication request object containing operation details.
 * @param {string} authenticationRequest.operation - The type of authentication operation to process.
 * @returns {Array} An array containing the result of the authentication handler.
 */
function processAuthenticationOperation(authenticationRequest) {
  const authenticationResults = [];

  // Determine which authentication handler to use based on the operation type
  switch (authenticationRequest.operation) {
    case "AssumeRoleWithWebIdentity":
      // Handle AssumeRoleWithWebIdentity operation
      authenticationResults.push(dz4(authenticationRequest));
      break;
    default:
      // Handle all other operations
      authenticationResults.push(createSigV4StsSigningScheme(authenticationRequest));
      break;
  }

  return authenticationResults;
}

module.exports = processAuthenticationOperation;