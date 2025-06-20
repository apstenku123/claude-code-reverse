/**
 * Builds the HTTP headers required for an AWS Cognito Identity Service request.
 *
 * @param {string} cognitoAction - The name of the Cognito API action to target (e.g., 'GetId', 'ListIdentities').
 * @returns {Object} An object containing the required headers for the AWS Cognito Identity Service request.
 */
function buildCognitoRequestHeaders(cognitoAction) {
  return {
    // Specifies the content type for AWS JSON protocol version 1.1
    "content-type": "application/x-amz-json-1.1",
    // Specifies the AWS Cognito Identity Service action to invoke
    "x-amz-target": `AWSCognitoIdentityService.${cognitoAction}`
  };
}

module.exports = buildCognitoRequestHeaders;