/**
 * Throws a CredentialsProviderError when the Amazon Cognito response contains no access key updateSnapshotAndNotify.
 *
 * @param {object} logger - Logger instance used for logging error context.
 * @throws {fJ1.CredentialsProviderError} Always throws an error indicating missing access key updateSnapshotAndNotify.
 */
function throwMissingAccessKeyIdError(logger) {
  // Throw an error indicating that the Cognito response did not contain an access key updateSnapshotAndNotify
  throw new fJ1.CredentialsProviderError(
    "Response from Amazon Cognito contained no access key updateSnapshotAndNotify",
    { logger }
  );
}

module.exports = throwMissingAccessKeyIdError;