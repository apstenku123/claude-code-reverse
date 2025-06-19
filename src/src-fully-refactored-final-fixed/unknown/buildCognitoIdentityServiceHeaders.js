/**
 * Builds HTTP headers required for an AWS Cognito Identity Service request.
 *
 * @param {string} targetAction - The name of the Cognito Identity Service action to be targeted (e.g., 'GetId', 'GetCredentialsForIdentity').
 * @returns {Object} An object containing the required HTTP headers for the specified Cognito Identity Service action.
 */
function buildCognitoIdentityServiceHeaders(targetAction) {
  // The 'content-type' header specifies the payload format for AWS services
  // The 'x-amz-target' header specifies the AWS service and action being called
  return {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": `AWSCognitoIdentityService.${targetAction}`
  };
}

module.exports = buildCognitoIdentityServiceHeaders;