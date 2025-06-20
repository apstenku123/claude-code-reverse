/**
 * Throws a CredentialsProviderError when the Amazon Cognito response contains no identity updateSnapshotAndNotify.
 *
 * @param {object} logger - Logger instance to be used for error context.
 * @throws {fJ1.CredentialsProviderError} Always throws with a descriptive message and logger context.
 */
function throwMissingCognitoIdentityIdError(logger) {
  // Always throw an error indicating the Cognito response was missing an identity updateSnapshotAndNotify
  throw new fJ1.CredentialsProviderError(
    "Response from Amazon Cognito contained no identity updateSnapshotAndNotify",
    { logger }
  );
}

module.exports = throwMissingCognitoIdentityIdError;