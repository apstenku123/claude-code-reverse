/**
 * Creates a credential provider function using web identity tokens for AWS SDK authentication.
 *
 * This function logs the credential provider initialization, extracts relevant parameters from the input options,
 * and ensures a role assumer function is available (either provided or loaded dynamically). It then calls the role
 * assumer with the appropriate parameters to obtain credentials.
 *
 * @param {Object} options - The configuration options for the credential provider.
 * @param {Object} options.logger - Logger instance for debug output (optional).
 * @param {string} options.roleArn - The ARN of the role to assume.
 * @param {string} [options.roleSessionName] - The session name for the assumed role.
 * @param {string} options.webIdentityToken - The web identity token to use for authentication.
 * @param {string} [options.providerId] - The provider updateSnapshotAndNotify for the web identity token.
 * @param {Array} [options.policyArns] - Optional policy ARNs to attach to the session.
 * @param {string} [options.policy] - Optional inline policy to attach to the session.
 * @param {number} [options.durationSeconds] - Optional duration for the session in seconds.
 * @param {Object} [options.clientConfig] - Client configuration for the AWS SDK client.
 * @param {Object} [options.parentClientConfig] - Parent client configuration for merging.
 * @param {Array} [options.clientPlugins] - Plugins to apply to the client.
 * @param {Function} [options.roleAssumerWithWebIdentity] - Optional custom role assumer function.
 *
 * @returns {Function} An async function that, when called with a context, returns AWS credentials.
 */
const createWebIdentityCredentialProvider = (options) => async (context) => {
  // Log the initialization for debugging purposes
  options.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");

  // Destructure relevant parameters from the options
  const {
    roleArn,
    roleSessionName,
    webIdentityToken,
    providerId,
    policyArns,
    policy,
    durationSeconds,
    roleAssumerWithWebIdentity
  } = options;

  let roleAssumer = roleAssumerWithWebIdentity;

  // If no role assumer is provided, dynamically load the default implementation
  if (!roleAssumer) {
    // Dynamically import the default role assumer provider
    const { getDefaultRoleAssumerWithWebIdentity } = await Promise.resolve().then(() => lE4(OQ1()));
    // Create the role assumer using merged client configs and plugins
    roleAssumer = getDefaultRoleAssumerWithWebIdentity({
      ...options.clientConfig,
      credentialProviderLogger: options.logger,
      parentClientConfig: {
        ...context?.callerClientConfig,
        ...options.parentClientConfig
      }
    }, options.clientPlugins);
  }

  // Call the role assumer with the required parameters to obtain credentials
  return roleAssumer({
    RoleArn: roleArn,
    RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
    WebIdentityToken: webIdentityToken,
    ProviderId: providerId,
    PolicyArns: policyArns,
    Policy: policy,
    DurationSeconds: durationSeconds
  });
};

module.exports = { createWebIdentityCredentialProvider };