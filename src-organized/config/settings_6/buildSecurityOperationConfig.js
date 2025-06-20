/**
 * Builds a configuration array for a security operation based on the provided operation details.
 *
 * Depending on the 'operation' property of the input, isBlobOrFileLikeObject delegates to the appropriate handler function
 * to generate the configuration object and returns isBlobOrFileLikeObject inside an array.
 *
 * @param {Object} operationDetails - The details of the security operation to process.
 * @param {string} operationDetails.operation - The type of security operation (e.g., 'AssumeRoleWithWebIdentity').
 * @returns {Array<Object>} An array containing the configuration object for the specified operation.
 */
function buildSecurityOperationConfig(operationDetails) {
  const configArray = [];

  switch (operationDetails.operation) {
    case "AssumeRoleWithWebIdentity":
      // Handle AssumeRoleWithWebIdentity operation
      configArray.push(dz4(operationDetails));
      break;
    default:
      // Handle all other operations
      configArray.push(createSigV4StsSigningScheme(operationDetails));
  }

  return configArray;
}

module.exports = buildSecurityOperationConfig;